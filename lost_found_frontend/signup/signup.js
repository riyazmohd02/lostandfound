// function validateAlphabets(inputField) {
//   var inputValue = inputField.value;
//   var regex = /^[A-Za-z]+$/;

//   if (!regex.test(inputValue)) {
//     // If the input contains non-alphabetic characters, remove them
//     inputField.value = inputValue.replace(/[^A-Za-z]/g, '');
//   }
//   else {
//     document.getElementById('firstname-error').innerText = ""; // Clear error when user starts typing
//   }
// }

function validateAlphabets(inputField) {
  var inputValue = inputField.value;

  // Capitalize the first letter and convert the rest to lowercase
  var formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();

  // Update the input field with the formatted value
  inputField.value = formattedValue;

  // Clear error when user starts typing
  document.getElementById('firstname-error').innerText = "";
}

function validateEmail(emailField) {
  var emailValue = emailField.value;
  var emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

  if (!emailRegex.test(emailValue)) {
    document.getElementById('email-error').innerText = "Invalid email";
  } else {
    document.getElementById('email-error').innerText = "";
  }
}

function validatePassword(passwordField) {
  var passwordValue = passwordField.value;
  var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;

  if (!passwordRegex.test(passwordValue)) {
    document.getElementById('password-error').innerText = "Invalid password. Must contain ([A-Z,a-z,0-9,@!#$*])";
  } else {
    document.getElementById('password-error').innerText = "";
  }

}

function validatePassword1(passwordField) {
  var password1Value = passwordField.value;
  var password1Regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;

  if (!password1Regex.test(password1Value)) {
    document.getElementById('password1-error').innerText = "Invalid password. Must contain ([A-Z,a-z,0-9,@!#$*])";
  } else {
    document.getElementById('password1-error').innerText = "";
  }

}

function togglePasswordVisibility() {
  var passwordField = document.getElementById('password');
  var showPasswordCheckbox = document.getElementById('showPassword');

  if (showPasswordCheckbox.checked) {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

function togglePasswordVisibility1() {
  var passwordField1 = document.getElementById('password1');
  var showPasswordCheckbox = document.getElementById('showPassword1');

  if (showPasswordCheckbox.checked) {
    passwordField1.type = "text";
  } else {
    passwordField1.type = "password";
  }

}
if(!document.getElementById('next-button').onclick){
document.getElementById('next-button').addEventListener('click', function () {
  validateForm();
});
}

function validateForm() {
  var firstname = document.getElementById('firstname').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password1 = document.getElementById('password1').value;

  document.getElementById('firstname-error').innerText = "";
  document.getElementById('email-error').innerText = "";
  document.getElementById('password-error').innerText = "";
  document.getElementById('password1-error').innerText = "";

  var labels = document.querySelectorAll('.mandatory label');
  labels.forEach(label => label.classList.remove('highlight-label'));

  var isValid = true;

  if (firstname.trim() === "") {
    document.getElementById('firstname-error').innerText = "Firstname is mandatory";
    isValid = false;
  } else {
    document.getElementById('firstname-error').innerText = ""; // Clear error when user starts typing
  }

  if (email.trim() === "") {
    document.getElementById('email-error').innerText = "Email is mandatory";
    isValid = false;
  } else {
    var emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      document.getElementById('email-error').innerText = "Invalid email. Please enter a valid Gmail address.";
      isValid = false;
    } else {
      document.getElementById('email-error').innerText = "";
    }
  }

  if (password.trim() === "") {
    document.getElementById('password-error').innerText = "Password is mandatory";
    isValid = false;
  } else {
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!passwordRegex.test(password)) {
      document.getElementById('password-error').innerText = "Invalid password. Must contain ([A-Z,a-z,0-9,@!#$*])";
      isValid = false;
    } else {
      document.getElementById('password-error').innerText = "";
    }
  }

  if (password1.trim() === "") {
    document.getElementById('password1-error').innerText = "Password is mandatory";
    isValid = false;
  } else {
    var password1Regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!password1Regex.test(password1)) {
      document.getElementById('password1-error').innerText = "Invalid password. Must contain ([A-Z,a-z,0-9,@!#$*])";
      isValid = false;
    } else {
      document.getElementById('password1-error').innerText = "";
    }
  }

  if (password !== password1) {
    document.getElementById('password1-error').innerText = "Passwords do not match";
    isValid = false;
  }

  if (isValid) {
    document.getElementById('next-button').disabled = true;
    registerUser(); // Call the function to register the user
  } else {
    // Scroll to the first error field for better visibility
    document.querySelector('.error-message:not(:empty)').closest('.form-container').scrollIntoView({
      behavior: 'smooth'
    });
  }
}
function create_account() {
  window.location.href = "../home page/home_page.html";
}

function showPopup() {
  // Create a popup element
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
  <div class="popup-content">
    <p>User account created successfully!</p>
    <button onclick="closePopup()">OK</button>
  </div>
`;
  document.body.appendChild(popup);
}

function closePopup() {
  // Remove the popup element
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
    window.location.href = "../login/login.html";
  }
}



function registerUser() {
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmpassword = document.getElementById('password1').value;

  const userData = {
    first_name: firstname,
    last_name: lastname,
    email: email,
    password: password,
    confirmpassword: confirmpassword,
  };

  // Make an HTTP request to your server-side script
  fetch('http://localhost:7000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        throw new Error('401 - Unauthorized: Invalid credentials');
      } else if (response.status === 409) {
        // Email already exists, show a popup
        throw new Error('409 - Conflict: User already exists');
        showEmailExistsPopup();
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    })
    .then(result => {
      //console.log('User registration successful:', result);
      showPopup();

      // Redirect to the login page or any other page
      //window.location.href = "../login/login.html";
    })
    .catch(error => {
      console.error('Error during user registration: ', error);
      showEmailExistsPopup()
    });
}

function showEmailExistsPopup() {
  // Create a popup element for email exists
  const emailExistsPopup = document.createElement('div');
  emailExistsPopup.className = 'popup';
  emailExistsPopup.innerHTML = `
<div class="popup-content">
  <p>Email already exists.</p>
  <p>Please use a different email.</p>
  <button onclick="closeEmailExistsPopup()">OK</button>
</div>
`;
  document.body.appendChild(emailExistsPopup);
}

function closeEmailExistsPopup() {
  // Remove the email exists popup element
  const emailExistsPopup = document.querySelector('.popup');
  if (emailExistsPopup) {
    emailExistsPopup.remove();
  }
}