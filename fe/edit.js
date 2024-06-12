/** FUNCTIONS FOR EDIT HTML */

// query selectors
const $canvas = document.querySelector(".canvas");
const context = $canvas.getContext('2d');

const $sourceImage = document.querySelector(".source-image");
const $bwButton = document.querySelector(".black-white");

function applyFilters() {
  //apply filters

  context.drawImage($sourceImage, 0, 0);
}


function loadImage() {
  const imgURL = localStorage.getItem("imageURL");
  $sourceImage.src = imgURL;
  $sourceImage.onload = function () {
    $canvas.width = this.width;
    $canvas.height = this.height;
    applyFilters();
  }
}


function start() {
  loadImage();
}

start();