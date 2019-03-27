// jQuery Login code
$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("form#login");
    var emailInput = $("input#email");
    var passwordInput = $("input#pwd");
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // Clear form if email and password checks out.
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // if post to login is succussful, go to home page.
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
    }
  
  });
  