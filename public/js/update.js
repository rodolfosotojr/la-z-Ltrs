$(document).ready(function () {
    // get ID from query string
    var url = window.location.search;
    var orderId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var isUpdated = false;

    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, orderId is 1
    if (url.indexOf("?post_id=") !== -1) {
        orderId = url.split("=")[1];
        getPostData(orderId);
    }

    // Assign variables to the form elements
    var $updateForm = $("form#updateorder");
    var $message = $("textarea#message");
    var $font = $("#fonttype");
    var $cardFormat = $("#format");
    var $senderName = $("input#sender-name");
    var $recipientName = $("input#recip-name");
    var $recipientBusiness = $("input#recip-bus");
    var $recipientAddress1 = $("input#recip-add1");
    var $recipientAddress2 = $("input#recip-add2");
    var $recipientCity = $("input#recip-city");
    var $recipientState = $("input#recip-state");
    var $recipientZIP = $("input#recip-zip");


    $font.change(function () {
        // console.log("You changed!");
        if ($("#fonttype").val() !== "") {
            $("#message").css({ "font-size": "3em", "font-family": $(this).val() });
        }
    })

    $cardFormat.change(function () {
        if ($("#format").val() !== "") {
            // do an AJAX call to get the image
            url = "https://api.handwrytten.com/v1/cards/view?card_id=" + $(this).val() + "&lowres=1"
            $.ajax({ url: url, method: "GET" }).then(function (handwrytten) {
                imgUrl = `<img src="${handwrytten.card.cover}" style="width: 125px; height:125px; object-fit: cover">`;
                $("#card-cover").empty();
                $("#card-cover").append($(imgUrl));
            })
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
        function updateOrder() {
            $.post("/api/order/"+orderId, orderData
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

        updateOrder();

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