$(document).ready(function () {
  // Assign variables to the form elements
  var $orderForm = $("form#order");
  var $message = $("textarea#message");
  var $font = $("#fonttype");
  var $cardFormat = $("#card-format");
  var $senderName = $("input#sender-name");
  var $recipientName = $("input#recip-name");
  var $recipientBusiness = $("input#recip-bus");
  var $recipientAddress1 = $("input#recip-add1");
  var $recipientAddress2 = $("input#recip-add2");
  var $recipientCity = $("input#recip-city");
  var $recipientState = $("input#recip-state");
  var $recipientZIP = $("input#recip-zip");

  $font.change(function(){
    console.log("You changed!");
    if ($("#fonttype").val() !== "") {
      $("#message").css({"font-size": "3em", "font-family": $(this).val()});
      console.log($(this).val());
    }
  })

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
      recipient_business_name: $recipientBusiness.val().trim(),
      recipient_address1: $recipientAddress1.val().trim(),
      recipient_address2: $recipientAddress2.val().trim(),
      recipient_city: $recipientCity.val().trim(),
      recipient_state: $recipientState.val().trim(),
      recipient_zip: $recipientZIP.val().trim(),
    };
    console.log(orderData);
    // Does a post to the register route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function createOrder() {
      $.post("/api/createorder", orderData
      ).then(function (data) {
        window.location.href = "/home";
        // window.location.href = "/home";
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }

    createOrder();
    // clear form:
    // $orderForm.val("");
    // $senderName.val("");
    // $recipientName.val("");
    // $font.val("");
    // $format.val("");

  });

  $("#speech").on("click", function (e) {
    e.preventDefault();
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      document.querySelector("#message").innerHTML = finalTranscript + interimTranscript;
    }
    recognition.start();
  })


});
