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

function enableEditMode() {
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
    .then ((userData) => {
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
    document.getElementById("save-button").disabled = false;
  }

  // Call the fetchUserData function when the DOM is loaded
  fetchUserData();
});

