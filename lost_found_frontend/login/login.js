const passwordField = document.getElementById('password');
      const passwordToggle = document.querySelector('.password-toggle');
      const loginButton = document.getElementById('loginButton');
      const emailField = document.querySelector('[type="text"]');

      let passwordVisible = false;

      function togglePasswordVisibility() {
        passwordVisible = !passwordVisible;
        passwordField.type = passwordVisible ? 'text' : 'password';
        passwordToggle.textContent = passwordVisible ? 'Hide Password' : 'Show Password';
      }

      function validatePassword(password) {
        // Add your password validation logic here
        // For example, check if the password is at least 8 characters long
        return password.length >= 15;
      }
      
      passwordToggle.addEventListener('click', togglePasswordVisibility);
      
      loginButton.addEventListener('click', () => {
        const username = emailField.value;
        const password = passwordField.value;
      
        if (!username.trim() && !password.trim()) {
          showAlert('Please enter your email and password.');
        } else if (!username.trim()) {
          showAlert('Please enter your email.');
        } else if (!password.trim()) {
          showAlert('Please enter your password.');
        } else if (!isValidEmail(username)) {
          showAlert('Invalid Email/Password');
        } else if (!validatePassword(password)) {
          showAlert('Invalid Email/Password');
        } else {
          login();
        }
      });
      
      function isValidEmail(email) {
        const emailRegex = /@gmail\.com$/i;
        return emailRegex.test(email);
      }
      
      function showAlert(message) {
        const alertPopup = document.createElement('div');
        alertPopup.className = 'alert-popup';
        alertPopup.textContent = message;
      
        document.body.appendChild(alertPopup);
      
        setTimeout(() => {
          alertPopup.remove();
        }, 3000);
      }
      
      function navigateToNextPage() {
        window.location.href = "../signup/SignUp.html";
      }
      
      function login() {
        window.location.href = "../home page/home_page.html";
      }