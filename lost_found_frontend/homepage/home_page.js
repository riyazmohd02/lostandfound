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

function home(){
  window.location.href="../homepage/home_page.html"
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

// function filterByName() {
//   // var searchInputValue = document.getElementById("searchInput").value;
//   // filterItems(searchInputValue);

//   const searchTerm = document.getElementById('searchInput').value;
//    if(searchTerm===null){
//     fetch(`http://localhost:7000/found`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(searchTerm,"se");
//       console.log(data,"da");
//       displayItems(data); // Assume displayItems is a function that renders items on the UI
//     })
//     .catch(error => {
//       console.error("Error fetching items:", error);
//     });
//    }
//    else{
//     // Fetch items based on the search term
//     fetch(`http://localhost:7000/found?search=${searchTerm}`)
//       .then(response => response.json())
//       .then(data => {
//         console.log(searchTerm,"se");
//         console.log(data,"da");
//         displayItems(data); // Assume displayItems is a function that renders items on the UI
//       })
//       .catch(error => {
//         console.error("Error fetching items:", error);
//       });
//     }
//   }

window.onload = function () {
  // Call filterByName when the page is loaded
  filterByName();
};
function filterByName() {
  const searchTerm = document.getElementById('searchInput').value;

  if (searchTerm === '') {
    // If the search term is empty, fetch all items
    fetch('http://localhost:7000/found')
      .then(response => response.json())
      .then(data => {
        displayItems(data); // Assume displayItems is a function that renders items on the UI
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  } else {
    // Fetch items based on the search term
    fetch(`http://localhost:7000/found?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        
        displayItems(data); // Assume displayItems is a function that renders items on the UI
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }
}



  function displayItems(items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = ''; // Clear previous items
    items.forEach(item => {
      // Render each item in the container (you can customize this as per your UI design)
      container.innerHTML += `<div class="image-row" >
      <div class= "image-container">
      <img src="../Images/noimage.jpg">
     <b> ${item.Item_name} </b>- ${item.status}
    
      </div>
      </div>`;
    });
  }



function reportlost() {
  window.location.href = '../lost_item/lost_item.html';
  localStorage.setItem("itemtype","lost")
}

function reportfound() {
  window.location.href = '../found_item/found_item.html';

  localStorage.setItem("itemtype","found")

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