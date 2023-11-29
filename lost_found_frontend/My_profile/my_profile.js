document.addEventListener("DOMContentLoaded", function () {
    const profilePicture = document.getElementById("profilePicture");
    const editImageInput = document.getElementById("editImage");
  
    // Add an event listener to the edit icon label
    profilePicture.addEventListener("click", function () {
      editImageInput.click();
    });
  
    // Handle the selected image file
    editImageInput.addEventListener("change", function (event) {
      const selectedImage = event.target.files[0];
  
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePicture.src = e.target.result;
        };
        reader.readAsDataURL(selectedImage);
      }
    });
  
    // Add functionality for the pencil icon
    const pencilIcons = document.querySelectorAll('.pencil-icon');
    pencilIcons.forEach(icon => {
      icon.addEventListener('click', function () {
        const inputField = icon.parentElement.querySelector('.with-icon');
        inputField.focus();
      });
    });
  });
  
  function goBack() {
    window.history.back();
  }
  document.addEventListener("DOMContentLoaded", function () {
    const profilePicture = document.getElementById("profilePicture");
    const editImageInput = document.getElementById("editImage");
  
    // Add an event listener to the edit icon label
    profilePicture.addEventListener("click", function () {
      editImageInput.click();
    });
  
    // Handle the selected image file
    editImageInput.addEventListener("change", function (event) {
      const selectedImage = event.target.files[0];
  
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePicture.src = e.target.result;
        };
        reader.readAsDataURL(selectedImage);
      }
    });
  });
  function goBack() {
    window.history.back();
  }
  
  function handleEditIconClick() {
    document.getElementById("editImage").click();
  }
  
  function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var countryRegion = document.getElementById("countryRegion").value;
  
    // Validate First Name
    if (!/^[a-zA-Z ]+$/.test(firstName)) {
      alert("Please enter a valid First Name (only letters and spaces allowed).");
      return false;
    }
  
    // Validate Last Name
    if (!/^[a-zA-Z ]+$/.test(lastName)) {
      alert("Please enter a valid Last Name (only letters and spaces allowed).");
      return false;
    }
  
    // Validate Email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid Email address.");
      return false;
    }
  
    // Validate Phone Number
    var phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit Phone Number.");
      return false;
    }
  
    // Validate Country/Region
    if (!/^[a-zA-Z ]+$/.test(countryRegion)) {
      alert("Please enter a valid Country/Region (only letters and spaces allowed).");
      return false;
    }
  
    return true;
  }