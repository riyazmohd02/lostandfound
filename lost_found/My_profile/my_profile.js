document.addEventListener("DOMContentLoaded", function () {
  const profilePicture = document.getElementById("profilePicture");
  const editImageInput = document.getElementById("editImage");

  // Add an event listener to the edit icon label
  profilePicture.addEventListener("click", function () {
    editImageInput.click();
  });

  // Handle the selected image file
  editImageInput.addEventListener("change", function (event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicture.src = e.target.result;
      };
      reader.readAsDataURL(selectedImage);
    }
  });
  
});
function goBack() {
  window.history.back();
}