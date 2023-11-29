function goBack() {
  window.history.back();
}

function openMenu() {
  var sidebar = document.getElementById("mySidebar");
  if (sidebar.style.display === "block") {
    sidebar.style.display = "none";
  } else {
    var header = document.querySelector(".header");
    var headerRect = header.getBoundingClientRect();
    sidebar.style.top = 50;
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

function claimRedirect() {
  window.location.href = '../claim form/claim.html';
}

