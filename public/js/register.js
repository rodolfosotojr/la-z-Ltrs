$(document).ready(function() {
    // Getting references to our form and input
    var registerForm = $("form#register");
    var emailInput = $("input#email-input");
    var firstNameInput = $("input#firstname-input");
    var lastNameInput = $("input#lastname-input");
    var passwordInput = $("input#password-input");
    var confirmInput = $("input#confirm-input");
    
  
    // When the register button is clicked, we validate the email and password are not blank
    registerForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        // email: emailInput.val().trim(), // NOT USED
        email: emailInput.val().trim(),
        firstname: firstNameInput.val().trim(),
        lastname: lastNameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password || !userData.firstname || !userData.lastname ) {
        return;
      }
      // If we have an email and password, run the registerUser function
      registerUser(userData.email, userData.firstname, userData.lastname, userData.password);
      emailInput.val("");
      firstNameInput.val("");
      lastNameInput.val("");
      passwordInput.val("");
      confirmInput.val("");
    });
  
    // Does a post to the register route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function registerUser(email, firstname, lastname, password) {
      $.post("/api/register", {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      }).then(function(data) {
        // window.location.replace(data);
        window.location.href = "/home";
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  