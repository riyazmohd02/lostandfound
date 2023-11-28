function openMenu() {
  var sidebar = document.getElementById("mySidebar");
  if (sidebar.style.display === "block") {
    sidebar.style.display = "none";
  } else {
    var header = document.querySelector(".header");
    var headerRect = header.getBoundingClientRect();
    sidebar.style.top = 50; /* Updated to align with the top of app-container */
    sidebar.style.display = "block";
  }
}


function showConfirmationPopup() {
  var popup = document.getElementById("confirmationPopup");
  popup.style.display = "block";
}

function hideConfirmationPopup() {
  var popup = document.getElementById("confirmationPopup");
  popup.style.display = "none";
}

function my_profile() {
  window.location.href = '../my_profile/my_profile.html';
}
function my_post() {
  window.location.href = '../MyPost/mypost.html';
}
function logout() {
  window.location.href = "../login_page/login.html";
}

function goBack() {
  window.history.back();
}

function handleMultipleFileSelect(event) {
  const files = event.target.files;

  for (const file of files) {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imagePreviewContainer = document.getElementById('image-preview-container');
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const image = document.createElement('img');
        image.src = e.target.result;

        const deleteButton = document.createElement('span');
        deleteButton.innerHTML = '&#10006;';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function () {
          imageContainer.remove();
        };

        imageContainer.appendChild(image);
        imageContainer.appendChild(deleteButton);
        imagePreviewContainer.appendChild(imageContainer);
      };

      reader.readAsDataURL(file);
    }
  }
}

function navigateToNextPage() {
  window.location.href = "../create_form/create_form.html";
}

function validateForm() {
  var category = document.getElementById('category').value;
  var location = document.getElementById('location').value;
  var description = document.getElementById('description').value;
 
  // Reset error messages
  document.getElementById('category-error').innerText = "";
  document.getElementById('location-error').innerText = "";
  document.getElementById('description-error').innerText = "";
 
  var isValid = true;
 
  // Check if mandatory fields are empty
  if (category.trim() === "") {
      document.getElementById('category-error').innerText = "Category is mandatory";
      isValid = false;
  }
 
  if (location.trim() === "") {
      document.getElementById('location-error').innerText = "Location is mandatory";
      isValid = false;
  }
 
  if (description.trim() === "") {
      document.getElementById('description-error').innerText = "Description is mandatory";
      isValid = false;
  }
 
  // If all mandatory fields are filled, proceed to the next page
  if (isValid) {
      navigateToNextPage();
  }
}

$(function () {
  $("#datepicker").datepicker();
});

const datePicker = document.getElementById('datepicker');

datePicker.addEventListener('change', function (event) {
  const selectedDate = event.target.value;
  // You can handle the selected date here
});

