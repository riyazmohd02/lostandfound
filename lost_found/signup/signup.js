document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var Email = document.getElementById('Email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    const togglePassword = document.querySelector('#pweye');
    const password =document.querySelector('#pweye');

    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye / eye slash icon
        this.classList.toggle('fa-sharp fa-solid fa-eye');
    });

    function onSign(googleUser) {
        // This is the function that will be called after a successful Google sign-in
        var profile = googleUser.getBasicProfile();
        var email = profile.getEmail();
    
        // You can use the 'email' variable to handle the sign-up with Gmail logic.
        console.log("Signed in as: " + email);
    }
    
    // Add your logic for handling form submission here
  })

  function signup() {
    window.location.href = "../home page/home_page.html";
 }
 