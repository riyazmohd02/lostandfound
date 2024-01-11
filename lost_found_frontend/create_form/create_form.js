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

var questionCount = 1;

function goBack() {
  window.history.back();
}

function addQuestion() {
  var questionContainer = document.getElementById('questionContainer');
  var lastQuestion = questionContainer.lastElementChild;
  var questionInput = lastQuestion.querySelector('input');

  if (questionInput.value.trim() !== '') {
    questionCount++;
    var newQuestion = document.createElement('div');
    newQuestion.className = 'question';
    newQuestion.innerHTML = '<label for="question" class="mandatory">Question ' + questionCount + '</label><label>:</label><input type="text" class="rounded-text-field" placeholder="Enter your question"><span class="deleteButton" onclick="deleteQuestion(this)">&#128465</span>';
    questionContainer.appendChild(newQuestion);


    var errorPopup = document.getElementById('errorPopup');
    errorPopup.style.display = 'none';
  } else {

    var errorPopup = document.getElementById('errorPopup');
    errorPopup.style.display = 'block';
    setTimeout(function () {
      errorPopup.style.display = 'none';
    }, 2000);
  }
}

function deleteQuestion(element) {
  var questionContainer = document.getElementById('questionContainer');
  var questions = questionContainer.getElementsByClassName('question');
  questionContainer.removeChild(element.parentElement);

  // Renumber the remaining questions
  for (var i = 0; i < questions.length; i++) {
    var label = questions[i].getElementsByTagName('label')[0];
    label.innerText = 'Question ' + (i + 1);
  }

  questionCount = questions.length;
}



function submitshowConfirmationPopup() {
  var questionContainer = document.getElementById('questionContainer');
  var questions = questionContainer.getElementsByClassName('question');
  var isValid = true;

  // Check if any question field is empty
  for (var i = 0; i < questions.length; i++) {
    var questionInput = questions[i].querySelector('input');
    if (questionInput.value.trim() === '') {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    var popup = document.getElementById('submit_confirmationPopup');
    popup.style.display = 'block';
    // navigateToNextPage()
   
  } else {
    var errorPopup1 = document.getElementById('errorPopup1');
    errorPopup1.style.display = 'block';
    setTimeout(function () {
      errorPopup1.style.display = 'none';
    }, 2000);
  }
}

// function navigateToNextPage() {
//   window.location.href = "../homepage/home_page";
// }

function ok() {
  window.location.href = "../homepage/home_page.html";
}

function closePopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
  // window.location.href = 'another_page.html'; // Uncomment if needed
}