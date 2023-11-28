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

// function submitForm(event) {
//   event.preventDefault();
//   var popup = document.getElementById('popup');
//   popup.style.display = 'block';
// }

function showConfirmationPopup() {
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
    var popup = document.getElementById('confirmationPopup');
    popup.style.display = 'block';
  } else {
    var errorPopup1 = document.getElementById('errorPopup1');
    errorPopup1.style.display = 'block';
    setTimeout(function () {
      errorPopup1.style.display = 'none';
    }, 2000);
  }
}


function ok() {
  window.location.href = "../home page/home_page.html";
}




function closePopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
  // window.location.href = 'another_page.html'; // Uncomment if needed
}