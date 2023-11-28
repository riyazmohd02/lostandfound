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

function logout() {
    window.location.href = "../login_page/login.html";
}

function goBack() {
    window.history.back();
}

$(function () {
    $("#datepicker").datepicker();
});

const datePicker = document.getElementById('datepicker');

datePicker.addEventListener('change', function (event) {
    const selectedDate = event.target.value;
    // You can handle the selected date here
});



function allowAlphabetsOnly(e) {
    var code = (e.which) ? e.which : e.keyCode;

    if ((code > 64 && code < 91) || (code > 96 && code < 123) || (code == 32)) {
        return true;
    }
    else {
        return false;
    }
}

function validateForm() {
    var category = document.getElementById('category').value;
    var description = document.getElementById('description').value;

    // Reset error messages
    document.getElementById('category-error').innerText = "";
    document.getElementById('description-error').innerText = "";

    var isValid = true;

    // Check if mandatory fields are empty
    if (category.trim() === "") {
        document.getElementById('category-error').innerText = "Category is mandatory";
        isValid = false;
    }

    if (description.trim() === "") {
        document.getElementById('description-error').innerText = "Description is mandatory";
        isValid = false;
    }

    if (isValid == true) {
        document.getElementById('submit').setAttribute("onclick", "openPopup()")
    }

    // If all mandatory fields are filled, proceed to the next page

}
function uploadImage1() {
    document.getElementById('img1').src = URL.createObjectURL(document.getElementById('file-input1').files[0]);
    document.getElementById('image2').style.display = "inline-flex"
}
function uploadImage2() {
    document.getElementById('img2').src = URL.createObjectURL(document.getElementById('file-input2').files[0]);
    document.getElementById('image3').style.display = "inline-flex"
}
function uploadImage3() {
    document.getElementById('img3').src = URL.createObjectURL(document.getElementById('file-input3').files[0]);
}

function openPopup() {

    popup.classList.add("open-popup");
    document.getElementById('body').style.filter = "blur(4px)"
    document.getElementById('body').style.backgroundColor = "gray"

}
function closePopup() {

    window.location.href = "../home page/home_page.html";
}

