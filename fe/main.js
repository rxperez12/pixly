const API_URL = "http://localhost:3000/";
// const $imageArea = document.querySelector(".image-area");
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

/** Given a array of image URLs makes list of images and appends on image list */
function putImagesOnPage(imageURLs) {
  console.log("putImagesOnPage", imageURLs);
  for (const url of imageURLs) {
    const $img = document.createElement("img");
    $img.src = url;
    const $li = document.createElement("li");
    $img.classList.add('image');
    $li.appendChild($img);
    $imageList.appendChild($li);
  }
}

function start() {
  getAndShowImages();
}

start();
