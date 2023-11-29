
function redirectToHome() {
  var colorAnswer = document.getElementById("color").value;
  var lostMobileAnswer = document.getElementById("lostMobile").value;

  if (colorAnswer.trim() === "" || lostMobileAnswer.trim() === "") {    
    return false;
  }

  window.location.href = "../home page/home_page.html";

  return false; 
}

function goBack() {
  window.history.back();
}

// function submit() {
//   window.location.href = "../home page/home_page.html";
// }