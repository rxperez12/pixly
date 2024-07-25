import config from "./config";

const FILE_SIZE_LIMIT = 3 * 1024 * 1024;
const API_URL = config.API_URL
const BASE_URL = config.URL
const $imageList = document.querySelector(".image-list");
const $imageForm = document.querySelector(".upload-image-form");


/** Check for invalid size and if valid send to API */
$imageForm.addEventListener("submit", async function (evt) {
  evt.preventDefault();
  const $fileError = document.querySelector(".file-error");
  const $fileInput = document.querySelector("#image");
  const file = $fileInput.files[0];

  if (!file) {
    $fileError.innerHTML = "Please select a file before uploading";
    return;
  }
  else if (file && file.size > FILE_SIZE_LIMIT) {
    $fileError.innerHTML = "File exceeds 3MB, please choose a smaller image";
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  await fetch(`${API_URL}/images`, {
    method: "POST",
    body: formData
  });

  window.location.reload();
});

/**
 * Get images from API and display on page
 */
async function getAndShowImages() {
  console.log("getAndShowImages");
  const response = await fetch(`${API_URL}/images`);
  const imagesResult = await response.json(); //images: image:{url, key}
  if (imagesResult.images.length === 0) {
    $imageList.innerHTML = "No images found, try uploading some!";
  }
  else {
    putImagesOnPage(imagesResult.images);
  }
}

/** Given a array of image data objects
 *  makes list of images and appends on image list */
function putImagesOnPage(images) {
  console.log("putImagesOnPage", images);
  for (const image of images) {
    // create img element
    const $img = document.createElement("img");
    $img.src = image.url;
    $img.classList.add('image');
    $img.id = image.key;

    // create anchor element
    const $anchor = document.createElement("a");
    $anchor.href = `${BASE_URL}/edit.html`;
    $anchor.appendChild($img);

    // create delete button
    const $deleteButton = document.createElement("button");
    $deleteButton.setAttribute('key', $img.id);
    $deleteButton.classList.add(
      "btn",
      "btn-danger",
      "delete-image-button",
      'btn-sm');
    $deleteButton.innerText = "X";

    // adding li
    const $imageDiv = document.createElement("div");
    $imageDiv.classList.add('list-group-item', 'col', "m-1");
    $imageDiv.append($anchor, $deleteButton);
    $imageList.appendChild($imageDiv);
  }
}


/** Listen for click event on image or its' delete button*/
$imageList.addEventListener("click", function (evt) {
  evt.preventDefault();
  const $clicked = evt.target;
  console.log("$clicked", $clicked);
  if ($clicked.matches('.image')) {
    // add image key and url to localStorage, load edit page
    localStorage.setItem("imageKey", $clicked.id);
    localStorage.setItem("imageURL", $clicked.src);
    console.log("baseURL", BASE_URL)
    window.location.href = `${BASE_URL}/edit.html`;
  }
  else if ($clicked.matches(".delete-image-button")) {
    const imageKey = $clicked.getAttribute('key');
    deleteImage(imageKey);
  }
});



/** Delete an image by key, reload page */
async function deleteImage(key) {
  await fetch(`${API_URL}/images/${key}`, {
    method: "DELETE"
  });

  window.location.reload();
}

async function start() {
  // localStorage.clear();
  getAndShowImages();
}

start();