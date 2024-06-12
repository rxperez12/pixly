const API_URL = "http://localhost:3000";

const $imageList = document.querySelector(".image-list");

/**
 * Get images from API and display on page
 */
async function getAndShowImages() {
  console.log("getAndShowImages");
  const response = await fetch(API_URL);
  const imagesResult = await response.json(); //images: image:{url, key}
  putImagesOnPage(imagesResult.images);
}

/** Given a array of image data objects
 *  makes list of images and appends on image list */
function putImagesOnPage(images) {
  console.log("putImagesOnPage", images);
  for (const image of images) {
    //adding img
    const $img = document.createElement("img");
    $img.src = image.url;
    $img.classList.add('image');
    $img.id = image.key;

    //adding li
    const $li = document.createElement("li");
    $li.classList.add('list-group-item');
    $li.appendChild($img);
    $imageList.appendChild($li);
  }
}

$imageList.addEventListener("click", (evt) => {
  const $clicked = evt.target;
  console.log("$clicked", $clicked);
  if (!$clicked.matches('.image')) return;

  // add image key and url to localStorage
  localStorage.setItem("imageKey", $clicked.id);
  localStorage.setItem("imageURL", $clicked.src);
  window.location.href = 'edit.html';
});

function start() {
  getAndShowImages();
}

start();