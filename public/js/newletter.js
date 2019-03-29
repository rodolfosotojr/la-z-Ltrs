$(document).ready(function () {
  var $orderForm = $("form#order");
  var $senderName = $("input#sendAd");
  var $recipientName = $("input#recipName");
  var $recipientMsg = $("textarea#content");
  var $font = $("textarea#font");
  var $format = $("textarea#card-format");
  // Getting references to our form and input
  // var $recipientAddress1 = $("input#recipient-address1-input");
  // var $recipientAddress2 = $("input#recipient-address2-input");
  // var $recipientCity = $("input#recipient-address2-input");
  // var $recipientState = $("input#recipient-address2-input");
  // var $recipientZIP = $("input#recipient-address2-input");


  // When the register button is clicked, we validate the email and password are not blank
  $orderForm.on("submit", function (event) {
    event.preventDefault();
    var orderData = {
      sender_name: $senderName.val().trim(),
      recipient_name: $recipientName.val().trim(),
      message: $recipientMsg.val()
    }

    // Does a post to the register route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function createOrder(sender_name, recipient_name, message) {
      $.post("/api/createorder",
        {
          sender_name: sender_name,
          recipient_name: recipient_name,
          message: message
        }
      ).then(function (data) {
        window.location.replace(data);
        // window.location.href = "/home";
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }

    
    // Simple validation
    // if (!orderData.sender_name || !orderData.recipient_name || !orderData.message) {
    //   return;
    // }
    // If we have an email and password, run the registerUser function
    createOrder(orderData.sender_name, orderData.recipient_name, orderData.message);
    // clear form:
    $orderForm.val("");
    $senderName.val("");
    $recipientName.val("");
    $font.val("");
    $format.val("");

  });


});
