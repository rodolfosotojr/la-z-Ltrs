$(document).ready(function () {
  // Getting references to our form and input
  var registerForm = $("form#register");
  var emailInput = $("input#email-input");
  var firstNameInput = $("input#firstname-input");
  var lastNameInput = $("input#lastname-input");
  var passwordInput = $("input#password-input");
  var confirmInput = $("input#confirm-input");


  // When the register button is clicked, we validate the email and password are not blank
  registerForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      firstname: firstNameInput.val().trim(),
      lastname: lastNameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // Does a post to the register route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function registerUser() {
      $.post("/api/register", userData)
        .then(function (data) {
          // window.location.replace(data);
          window.location.href = "/home";
          // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }

    registerUser(userData);

    emailInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    passwordInput.val("");
    confirmInput.val("");


  });
  // END registerForm




});
