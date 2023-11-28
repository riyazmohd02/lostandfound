// const passwordField = document.getElementById('password');
// const passwordToggle = document.querySelector('.password-toggle');
// const loginButton = document.getElementById('loginButton');

// let passwordVisible = false;

// passwordToggle.addEventListener('click', () => {
//   passwordVisible = !passwordVisible;
//   passwordField.type = passwordVisible ? 'text' : 'password';
//   // Change the eye icon based on the password visibility state
//   passwordToggle.textContent = passwordVisible ? '👁️' : '👁️'; // Change the icon accordingly
// });

// loginButton.addEventListener('click', () => {
//   // Implement login logic here
//   alert('Login button clicked');
// });
// function navigateToNextPage() {
//   window.location.href = "../signup/SignUp.html";
// }


const passwordField = document.getElementById('password');
const passwordToggle = document.querySelector('.password-toggle');
const loginButton = document.getElementById('loginButton');

let passwordVisible = false;

function togglePasswordVisibility() {
 passwordVisible = !passwordVisible;
 passwordField.type = passwordVisible ? 'text' : 'password';
 passwordToggle.textContent = passwordVisible ? 'Hide Password' : 'Show Password';
}
passwordToggle.addEventListener('click', togglePasswordVisibility);

loginButton.addEventListener('click', () => {
  // Implement your login logic here
  // For example, check credentials and redirect on success
  const username = document.querySelector('[type="text"]').value;
  const password = passwordField.value;
  if (!username && !password) {
      alert('Please enter your email and password.');
  } else if (!username) {
      alert('Please enter your email.');
  } else if (!password) {
      alert('Please enter your password.');
  } else {
      // Simulate successful login for demonstration purposes
      login()
      // Redirect to a success page or perform other actions
      // window.location.href = "success.html";
  }
});


function navigateToNextPage() {
   window.location.href = "../signup/SignUp.html";
}


function login() {
    window.location.href = "../home page/home_page.html";
 }
 