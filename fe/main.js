const API_URL = "http://localhost:3000/"
// const $imageArea = document.querySelector(".image-area");
const $imageList = document.querySelector(".image-list");

async function getAndShowImages() {
  console.log("getAndShowImages");
  const response = await fetch(API_URL);
  const imagesResult = await response.json();
  putImagesOnPage(imagesResult.images);
}

function putImagesOnPage(imageURLs) {
  console.log("putImagesOnPage", imageURLs);
  for (const url of imageURLs) {
    const $img = document.createElement("img");
    $img.src = url;
    const $li = document.createElement("li");
    $li.appendChild($img);
    $imageList.appendChild($li);
  }
}

function start() {
  getAndShowImages();
}

start();
