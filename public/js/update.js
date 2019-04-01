$(document).ready(function () {
    // Assign variables to the form elements
    var $updateForm = $("form#update-order");
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
    var orderId;
    // get ID from query string
    var url = window.location.search;
    // extract the orderId number using indexOf
    if (url.indexOf("?orderid=") !== -1) {
        orderId = url.split("=")[1];
        getOrder();
    } else  {
        window.location.href = "/home";
    }

    // Get the Single Order
    function getOrder() {
        qryURL = "/api/order/" + orderId;
        $.get(qryURL, function(orderData) {
            console.log(orderData);
            // assign all the data to the form
            $message.val(orderData.message);
            $("#format").val(orderData.card_id).change();
            // $("#format option:selected").text(orderData);
            $("#fonttype").val(orderData.font).change();
            // $("#fonttype option:selected").text(orderData);
            $senderName.val(orderData.sender_name);
            $recipientName.val(orderData.recipient_name);
            $recipientBusiness.val(orderData.recipient_business_name);
            $recipientAddress1.val(orderData.recipient_address1);
            $recipientAddress2.val(orderData.recipient_address2);
            $recipientCity.val(orderData.recipient_city);
            $("#recip-state").val(orderData.recipient_state).change();
            $recipientZIP.val(orderData.recipient_zip);
        }) 
    }

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
    $updateForm.on("submit", function (event) {
        event.preventDefault();
        // update the values from form
        orderData = {
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
            recipient_state: $recipientState.val(),
            recipient_zip: $recipientZIP.val().trim(),
        };
        console.log(orderData);

        function updateOrder() {
            $.ajax({
                method: "PUT",
                url: "/api/update/" + orderId,
                data: orderData
            })
                .then(function () {
                    window.location.href = "/home";
                });
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