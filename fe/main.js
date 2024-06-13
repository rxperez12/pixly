const API_URL = "http://localhost:3000";
const FILE_SIZE_LIMIT = 3 * 1024 * 1024;

const $imageList = document.querySelector(".image-list");
const $imageForm = document.querySelector(".upload-image-form");


/** Check for invalid size and if valid send to API */
$imageForm.addEventListener("submit", async function (evt) {
  evt.preventDefault();
  const $fileSizeError = document.querySelector(".file-size-error");
  const $fileInput = document.querySelector("#image");
  const file = $fileInput.files[0];
  if (file && file.size > FILE_SIZE_LIMIT) {

    $fileSizeError.innerHTML = "File exceeds 3MB, please choose a smaller image";
    return;
  }

  $fileSizeError.innerHTML = '';

  const formData = new FormData();
  formData.append("image", file);

  fetch(`${API_URL}/images`, {
    method: "POST",
    body: formData
  }).then(function (response) {
    // message: "image added!" - setTimout - reloadsb
    window.location.reload();
  }).catch();

});

/**
 * Get images from API and display on page
 */
async function getAndShowImages() {
  console.log("getAndShowImages");
  const response = await fetch(`${API_URL}/images`);
  const imagesResult = await response.json(); //images: image:{url, key}
  putImagesOnPage(imagesResult.images);
}

/** Given a array of image data objects
 *  makes list of images and appends on image list */
function putImagesOnPage(images) {
  console.log("putImagesOnPage", images);
  for (const image of images) {
    // adding img
    const $img = document.createElement("img");
    $img.src = image.url;
    $img.classList.add('image');
    $img.id = image.key;

    // adding anchor tag
    const $anchor = document.createElement("a");
    $anchor.href = '/edit.html';
    $anchor.appendChild($img);

    // adding li
    const $li = document.createElement("li");
    $li.classList.add('list-group-item');
    $li.appendChild($anchor);
    $imageList.appendChild($li);
  }
}




/** Listen for click event on image */
$imageList.addEventListener("click", (evt) => {
  evt.preventDefault();
  const $clicked = evt.target;
  console.log("$clicked", $clicked);
  if (!$clicked.matches('.image')) return;

  // add image key and url to localStorage
  localStorage.setItem("imageKey", $clicked.id);
  localStorage.setItem("imageURL", $clicked.src);
  window.location.href = 'http://localhost:5173/edit.html';
});

async function start() {
  // localStorage.clear();
  getAndShowImages();
}

start();