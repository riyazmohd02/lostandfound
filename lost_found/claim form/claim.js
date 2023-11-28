
function redirectToHome() {
  var colorAnswer = document.getElementById("color").value;
  var lostMobileAnswer = document.getElementById("lostMobile").value;

  if (colorAnswer.trim() === "" || lostMobileAnswer.trim() === "") {    
    return false;
  }

  window.location.href = "../login/login.html";

  return false; 
}

function goBack() {
  window.history.back();
}