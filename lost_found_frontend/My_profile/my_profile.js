document.addEventListener("DOMContentLoaded", function () {
  const profilePicture = document.getElementById("profilePicture");
  const editImageInput = document.getElementById("editImage");
  const inputFields = document.querySelectorAll('.form-control');
  const saveButton = document.getElementById("save-button");

  inputFields.forEach(function (field) {
    field.addEventListener('input', handleInputChange);
  });

  function handleInputChange() {
    // Check if any changes are made
    const changesMade = Array.from(inputFields).some(field => {
      return field.value !== field.defaultValue;
    });

    // Check if the profile picture has changed
    const profilePictureChanged = profilePicture.src !== "../Images/2.png";

    // Enable or disable the "Save Changes" button based on changes
    saveButton.disabled = !(changesMade || profilePictureChanged);
    saveButton.classList.toggle('active', (changesMade || profilePictureChanged));
  }

  // Handle the selected image file and update the profile picture
  editImageInput.addEventListener("change", function (event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicture.src = e.target.result;
        handleInputChange(); // Trigger input change handling
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

});

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
  document.getElementById("save-button").removeAttribute('disabled');
}

function saveChanges() {
  // Disable all input fields
  const inputFields = document.querySelectorAll('.form-control');
  inputFields.forEach(function (field) {
    field.setAttribute('disabled', 'disabled');
  });

  // Disable the "Save Changes" button
  const saveButton = document.getElementById("save-button");
  saveButton.setAttribute('disabled', 'disabled');

  // Change button color to grey and cursor to none
  saveButton.style.backgroundColor = '#a6a6a6';
  saveButton.style.cursor = 'not-allowed';

  // Display a side popup message for 3 seconds
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = "Changes saved!";
  document.body.appendChild(popup);

  setTimeout(function () {
    popup.remove();
  }, 3000);

  // Return false to prevent the form submission (assuming you don't want to submit the form)
  return false;
}
        
