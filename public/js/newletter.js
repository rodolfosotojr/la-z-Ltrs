$(document).ready(function () {
  // Assign variables to the form elements
  var $orderForm = $("form#order");
  var $message = $("textarea#message");
  var $font = $("#fonttype");
  var $cardFormat = $("#format");
  var $senderName = $("input#sender-name");
  var $recipientName = $("input#recip-name");
  var $recipientBusiness = $("input#recip-bus");
  var $recipientAddress1 = $("input#recip-add1");
  var $recipientAddress2 = $("input#recip-add2");
  var $recipientCity = $("input#recip-city");
  var $recipientState = $("#recip-state");
  var $recipientZIP = $("input#recip-zip");
  var init = false;
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  var finalTranscript = '';
  var recognition = new window.SpeechRecognition();

  $font.change(function () {
    if ($("#fonttype").val() !== "") {
      $("#message").css({ "font-size": "3.5em", "font-family": $(this).val() });
    }
  });

  $cardFormat.change(function () {
    if ($("#format").val() !== "") {
      // do an AJAX call to get the image
      url = "https://api.handwrytten.com/v1/cards/view?card_id=" + $(this).val() + "&lowres=1"
      $.ajax({ url: url, method: "GET" }).then(function (handwrytten) {
        imgUrl = `<img style="max-height: 240px" class="img-responsive" src="${handwrytten.card.cover}">`;
        $("#card-cover").empty();
        $("#card-cover").append($(imgUrl));
        if (handwrytten.card.images.inside[0].image) {
          $("#message").css({
            "background-image": "url('" + handwrytten.card.images.inside[0].image + "')", 
            "object-fit": "cover" 
          });
        }
      })
    }
  });

  // When the register button is clicked, we validate the email and password are not blank
  $orderForm.on("submit", function (event) {
    event.preventDefault();
    // get values from form
    var orderData = {
      message: $message.val(),
      card_id: $("#format").val(),
      card_type: $("#format option:selected").text(),
      font: $("#fonttype").val(),
      font_label: $("#fonttype option:selected").text(),
      sender_name: $senderName.val().trim(),
      recipient_name: $recipientName.val().trim(),
      // recipient_business_name: $recipientBusiness.val().trim(),
      recipient_address1: $recipientAddress1.val().trim(),
      recipient_address2: $recipientAddress2.val().trim(),
      recipient_city: $recipientCity.val().trim(),
      recipient_state: $recipientState.val(),
      recipient_zip: $recipientZIP.val().trim(),
    };

    // Does a post to the register route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function createOrder() {
      $.post("/api/createorder", orderData
      ).then(function (data) {
        window.location.href = "/home";
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    };

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    };

    createOrder();
  });

  function Speech() {
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = function (event) {
      var interimTranscript = '';
      for (var i = event.resultIndex, len = event.results.length; i < len; i++) {
        var transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      document.querySelector("#message").innerHTML = finalTranscript + interimTranscript;
      charCount();
    }
  };

  $("#speech").on("click", function (e) {
    e.preventDefault();
    init = !init;

    if (init) {
      Speech();
      recognition.start();
    } else {
      Speech();
      recognition.stop();
    }
  });

  // show character count in message textarea
  function charCount() {
    // show character count in message box
    $("#char-count").text($message.val().length);
  }
  // character counter
  $message.change(charCount);
  $message.keyup(charCount);
  charCount();

});
