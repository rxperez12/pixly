/** FUNCTIONS FOR EDIT HTML */

// query selectors
const $canvas = document.querySelector(".canvas");
const context = $canvas.getContext('2d');

const $sourceImage = document.querySelector(".source-image");
const $bwButton = document.querySelector(".black-white");
const $presetFilters = document.querySelector(".preset-filters");

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
    context.drawImage(this, 0, 0);
  };
}

function resetImage() {
  const greyScale = `greyscale(0%)`;
  const brightnessScale = `brightness(100%)`;
  const contrast = `contrast(100%)`;

}

/** Applies settings for black and white filter and then applies them to canvas */
function blackWhiteFilter() {
  console.log('blackwhite filter');
  const greyScale = `100`;
  const brightnessScale = `120`;
  const contrastScale = `120`;
  applyFilter({ greyScale, brightnessScale, contrastScale });
}

/** Take argument string settings and applies the settings to the image*/
function applyFilter(filters) {
  console.log('Applied filters:', filters);

  let filterString =
    "brightness(" + filters.brightnessScale + "%" +
    ") contrast(" + filters.contrastScale + "%" +
    ") grayscale(" + filters.greyScale + "%" +
    ") saturate(" + "50" + "%" +
    ") sepia(" + "0" + "%" +
    ")";

  context.filter = filterString;
  context.drawImage($sourceImage, 0, 0);
}

$presetFilters.addEventListener("click", (evt) => {
  const $clicked = evt.target;

  if ($clicked.matches('.black-white')) {
    console.log("clicked on black and white");
    blackWhiteFilter();
  }

});



function start() {
  loadImage();
}

start();