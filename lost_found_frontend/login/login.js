const passwordField = document.getElementById('password');
      const loginButton = document.getElementById('loginButton');
      const emailField = document.querySelector('[type="text"]');

      let passwordVisible = false;

      function togglePasswordVisibility() {
        passwordVisible = !passwordVisible;
        passwordField.type = passwordVisible ? 'text' : 'password';
      }

      function displayErrorPopup(message) {
        const errorPopup = document.createElement('div');
        errorPopup.classList.add('alert-popup');
        errorPopup.textContent = message;
        document.body.appendChild(errorPopup);

        setTimeout(() => {
          errorPopup.remove();
        }, 3000); // Display the error for 3 seconds (adjust as needed)
      }

      function validateEmail(email) {
        // You can implement additional email validation if needed
        return email.endsWith('@gmail.com');
      }

      function validatePassword(password) {
        // Password should have one capital letter, one small letter, one number, and one special character
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
      }

      
      function login() {
        const userEmail = emailField.value.trim();
        const userPassword = passwordField.value.trim();
       
        if (!userEmail && !userPassword) {
          displayErrorPopup('Enter email and password');
          return;
        }
        if (!userEmail) {
          displayErrorPopup('Enter email ');
          return;
        }

        if (!userPassword) {
          displayErrorPopup('Enter password');
          return;
        }

        if (!validateEmail(userEmail) || !validatePassword(userPassword)) {
          displayErrorPopup('Invalid email/password');
          return;
        }

        const loginUserData = {
          email: userEmail,
          password: userPassword,
        };

        fetch('http://localhost:7000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginUserData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            if (data.error) {
              displayErrorPopup(data.error); // Display error from the server
            } else {
              
              window.location.href = '../home page/home_page.html';
            }
          })
          .catch(error => {
            console.log('Error:', error);
            displayErrorPopup("User does'nt exists!")
          });
      }

      function navigateToNextPage() {
        window.location.href = "../signup/SignUp.html";
      }
