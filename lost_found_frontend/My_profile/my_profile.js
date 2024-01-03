function validateAlphabets(inputField) {
  var inputValue = inputField.value;

  // Capitalize the first letter and convert the rest to lowercase
  var formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();

  // Update the input field with the formatted value
  inputField.value = formattedValue;
  var regex = /^[A-Za-z]+$/;

  if (!regex.test(inputValue)) {
    // If the input contains non-alphabetic characters, remove them
    inputField.value = inputValue.replace(/[^A-Za-z]/g, '');
  }
  else {
    document.getElementById('firstname-error').innerText = ""; // Clear error when user starts typing
  }

  // Clear error when user starts typing
  document.getElementById('firstname-error').innerText = "";
}

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

function validatePhoneNumber(inputField) {
  var inputValue = inputField.value;
  var regex = /^[0-9]{10}$/;

  if (!regex.test(inputValue)) {
    // If the input does not match the pattern, show an error message
    inputField.value = inputValue.replace(/\D/g, '');
    document.getElementById('phonenumber-error').innerText = "Invalid mobile number";
    // You can add additional styling or logic here to highlight the error to the user
  } else {
    // If the input is valid, clear the error message
    document.getElementById('phonenumber-error').innerText = "";
  }
}

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



});

function goBack() {
  window.history.back();
}


function toggleEditMode() {
  const editProfileBtn = document.getElementById("edit-profile-btn");
  const saveButton = document.getElementById("save-button");

  // Toggle the class 'active' on the "Edit Profile" button
  editProfileBtn.classList.toggle('active');

  // If the button is in edit mode (has the 'active' class)
  if (editProfileBtn.classList.contains('active')) {
    // Change button style when in edit mode (gray color)
    editProfileBtn.style.backgroundColor = '#a6a6a6';
    editProfileBtn.style.color = '#fff';

    // Change "Save Changes" button style when in edit mode (blue color)
    saveButton.style.backgroundColor = '#27adda';
    saveButton.style.color = 'black';
    // Enable pointer events for the active state
    saveButton.style.pointerEvents = 'auto';
    // Set cursor to pointer
    saveButton.style.cursor = 'pointer';
  } else {
    // Change button style when not in edit mode (#27adda color)
    editProfileBtn.style.backgroundColor = '#27adda';
    editProfileBtn.style.color = 'black';

    // Change "Save Changes" button style when not in edit mode (gray color)
    saveButton.style.backgroundColor = '#a6a6a6';
    saveButton.style.color = '#fff';
    // Disable pointer events for the inactive state
    saveButton.style.pointerEvents = 'none';
  }

  // Add your logic to enable/disable input fields, etc.
  enableEditMode();
}

function enableEditMode() {
  // Toggle the class 'active' on the "Edit Profile" button
  const editProfileBtn = document.getElementById("edit-profile-btn");
  editProfileBtn.classList.toggle('active');

  // Enable specific input fields for editing
  document.getElementById("LastName").removeAttribute('disabled');
  document.getElementById("Phonenumber").removeAttribute('disabled');
  document.getElementById("gender").removeAttribute('disabled');
  document.getElementById("Country/Region").removeAttribute('disabled');

  // Disable other input fields
  document.getElementById("firstName").setAttribute('disabled', 'disabled');
  document.getElementById("Email").setAttribute('disabled', 'disabled');

  // Enable the "Save Changes" button
  document.getElementById("save-button").removeAttribute('disabled');
}

function validateAndCapitalize(input) {
  // Capitalize the first letter
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);

  // Validate only alphabets
  input.value = input.value.replace(/[^a-zA-Z]/g, '');
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

  const editProfileBtn = document.getElementById("edit-profile-btn");
  editProfileBtn.style.backgroundColor = '#27adda';
  editProfileBtn.style.color = 'black';
  // Display a side popup message for 3 seconds
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = "Changes saved!";
  document.body.appendChild(popup);

  setTimeout(function () {
    popup.remove();
  }, 3000);


  const updatedUserData = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("LastName").value,
    email: document.getElementById("Email").value,
    phone_number: document.getElementById("Phonenumber").value,
    gender: document.getElementById("gender").value,
    country_region: document.getElementById("Country/Region").value,
  };


  const userid = localStorage.getItem("userid");

  // Make a PUT request to update user data
  fetch(`http://localhost:7000/user/${userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  })

    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.json();
    })
    .then((userData) => {
      console.log("USER DATA: ", userData);

      //update the UI with the fetched user data
      updateUI(userData);
    })
    .then((updatedData) => {
      console.log("Updated User Data:", updatedData);

      // Optionally, update the UI with the updated data
      updateUI(updatedData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // Return false to prevent the form submission (assuming you don't want to submit the form)
  return false;
}

// Retrieve user ID from localStorage
document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch user data and update the UI
  function fetchUserData() {
    const userid = localStorage.getItem("userid");

    // Make a GET request to fetch user data
    fetch(`http://localhost:7000/user/${userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        console.log("User Data:", userData);

        // Update the UI with the fetched user data
        updateUI(userData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Function to update the UI with user data
  function updateUI(userData) {
    // Update the elements in your HTML with the user data
    document.getElementById("firstName").value = userData[0].first_name;
    document.getElementById("LastName").value = userData[0].last_name;
    document.getElementById("Email").value = userData[0].email;
    document.getElementById("Phonenumber").value = userData[0].phone_number;
    document.getElementById("gender").value = userData[0].gender;
    document.getElementById("Country/Region").value =
      userData[0].country_region;

    // Enable the save button after fetching user data
    document.getElementById("save-button").disabled = true; // Ensure the button is initially disabled
  }

  // Call the fetchUserData function when the DOM is loaded
  fetchUserData();
});
