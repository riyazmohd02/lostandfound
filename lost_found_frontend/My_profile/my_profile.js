document.addEventListener("DOMContentLoaded", function () {
  const profilePicture = document.getElementById("profilePicture");
  const editImageInput = document.getElementById("editImage");
  const inputFields = document.querySelectorAll('.form-control');
  const saveChangesBtn = document.getElementById('saveChangesBtn');

  inputFields.forEach(function (field) {
    field.addEventListener('input', handleInputChange);
  });

  function handleInputChange() {
    // Check if any changes are made
    const changesMade = Array.from(inputFields).some(field => {
      return field.value !== field.defaultValue;
    });

    // Enable or disable the "Save Changes" button based on changes
    saveChangesBtn.disabled = !changesMade;
  }
});
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




function goBack() {
  window.history.back();
}

function enableEditMode() {
  // Enable specific input fields for editing
  document.getElementById("LastName").removeAttribute('disabled');
  document.getElementById("Phone number").removeAttribute('disabled');
  document.getElementById("gender").removeAttribute('disabled');
  document.getElementById("Country/Region").removeAttribute('disabled');

  // Disable other input fields
  document.getElementById("firstName").setAttribute('disabled', 'disabled');
  document.getElementById("Email").setAttribute('disabled', 'disabled');

  // Enable the "Save Changes" button
  document.querySelector('.registerbtn').removeAttribute('disabled');
}

function saveChanges() {
  // Your existing saveChanges function logic...
  // After saving changes, disable input fields and the "Save Changes" button
  var inputFields = document.querySelectorAll('.form-control');
  inputFields.forEach(function (field) {
    field.setAttribute('disabled', 'disabled');
  });

  document.querySelector('.registerbtn').setAttribute('disabled', 'disabled');

  // You can also display a confirmation message if needed
  document.getElementById('confirmationMessage').innerText = 'Changes saved successfully!';

  return false; // Prevent the form from submitting (remove this line if form submission is needed)
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