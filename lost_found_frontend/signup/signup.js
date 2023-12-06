function validateAlphabets(inputField) {
  var inputValue = inputField.value;
  var regex = /^[A-Za-z]+$/;

  if (!regex.test(inputValue)) {
    // If the input contains non-alphabetic characters, remove them
    inputField.value = inputValue.replace(/[^A-Za-z]/g, '');
  }
  else {
    document.getElementById('firstname-error').innerText = ""; // Clear error when user starts typing
  }
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

function validateForm() {
  // alert("hi")
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password1 = document.getElementById('password1').value;


  document.getElementById('firstname-error').innerText = "";
  document.getElementById('lastname-error').innerText = "";
  document.getElementById('email-error').innerText = "";
  document.getElementById('password-error').innerText = "";
  document.getElementById('password1-error').innerText = "";

  var labels = document.querySelectorAll('.mandatory label');
  labels.forEach(label => label.classList.remove('highlight-label'));

  var isValid = true;


  if (firstname.trim() === "") {
    document.getElementById('firstname-error').innerText = "Firstname is mandatory";
    alert("hi")
    isValid = false;
  } else {
    document.getElementById('firstname-error').innerText = ""; // Clear error when user starts typing
  }

  if (email.trim() === "") {
    document.getElementById('email-error').innerText = "Email is mandatory";
    isValid = false;
  } else {
    document.getElementById('email-error').innerText = ""; // Clear error when user starts typing
  }

  if (password.trim() === "") {
    document.getElementById('password-error').innerText = "Password is mandatory";
    isValid = false;
  }

  if (password1.trim() === "") {
    document.getElementById('password1-error').innerText = "Password is mandatory";
    isValid = false;
  }

  if (password !== password1) {
    document.getElementById('password1-error').innerText = "Passwords do not match";
    isValid = false;
  }

  if (isValid) {
    create_account();
  } else {

    if (firstname.trim() === "") {
      document.getElementById('firstname').focus();
    } else if (lastname.trim() === "") {
      document.getElementById('lastname').focus();
    } else if (email.trim() === "") {
      document.getElementById('email').focus();
    } else if (password.trim() === "") {
      document.getElementById('password').focus();
    }
    else if (password1.trim() === "") {
      document.getElementById('password1').focus();
    }
  }
}

function registerUser() {
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmpassword = document.getElementById('confirmpassword').value;

  const userData = {
    first_name: firstname,
    last_name: lastname,
    email: email,
    password: password,
    confirmpassword: confirmpassword,
  };
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
        throw new Error('409 - Conflict: User already exists');
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    })
    .then(result => {
      console.log('User registration successful:', result);
      alert('User registration successful!');

      // Redirect to the login page
      window.location.href = "../login/login.html";

    })

    .catch(error => {
      console.error('Error during user registration: ', error);
    })
}