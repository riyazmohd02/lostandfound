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
  window.location.href = "../login/login.html";
}

function goBack() {
  window.history.back();
}
function filterItems(searchValue) {
  // Convert the search value to lowercase for case-insensitive comparison
  var searchLower = searchValue.toLowerCase();

  // Get all image containers
  var imageContainers = document.querySelectorAll('.image-container');

  // Iterate through each container and show/hide based on the search value
  imageContainers.forEach(function (container) {
      var description = container.querySelector('p').innerText.toLowerCase();

      if (description.includes(searchLower)) {
          container.style.display = 'block';
      } else {
          container.style.display = 'none';
      }
  });
}

function filterByName() {
  var searchInputValue = document.getElementById("searchInput").value;
  filterItems(searchInputValue);
}


function reportlost() {
  window.location.href = '../lost_item/lost_item.html';
}

function reportfound() {
  window.location.href = '../found_item/found_item.html';
}

function showImageDetails(imageName) {
  // Implement logic to show details for the clicked image
  console.log("Clicked on image:", imageName);
  // Add your logic to display details or navigate to a new page
}

function toggleAddPopup() {
  var addPopup = document.getElementById("addPopup");
  addPopup.style.display = addPopup.style.display === "block" ? "none" : "block";
}

function showImageDetails() {
  window.location.href = '../claim_page/claim_page.html';
}