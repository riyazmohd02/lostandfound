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
    var title = document.getElementById('itemname').value;
    var location = document.getElementById('location').value;
    var datePicker = document.getElementById('datepicker').value;
    var color = document.getElementById('color').value;
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

    // if (isValid == true) {
    //     document.getElementById('submit').setAttribute("onclick", "openPopup()")
    // }
    if (isValid) {
        navigateToNextPage();

        const itemtype = localStorage.getItem("itemtype");
        console.log(itemtype);

        const userId = localStorage.getItem("userid");
        const firstname = localStorage.getItem("firstname");
        const lastname = localStorage.getItem("lastname");
        console.log(firstname,lastname);

        const data = {
            userid: userId,
            first_name: firstname,
            last_name: lastname,
            category_id: category,
            Item_name: title,
            itemtype: itemtype,
            location: location,
            color: color,
            date_found: datePicker,
            description: description,
        };
        console.log(data, "LOSTdata")

        //make POST request tp your backend
        fetch("http://localhost:7000/items", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(data),

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP error! status ${response.status');
                }
                return response.JSON();
            })
            .then((data) => {
                console.log(data);
                if (data.error) {
                    displayErrorPopup(data.error);
                }
            })

    } else {

        if (category.trim() === "") {
            document.getElementById('category').focus();
        } else if (location.trim() === "") {
            document.getElementById('location').focus();
        } else if (description.trim() === "") {
            document.getElementById('description').focus();
        }
    }
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


