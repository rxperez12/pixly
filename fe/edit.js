/** FUNCTIONS FOR EDIT HTML */
const API_URL = "http://localhost:3000";
const BASE_URL = "http://localhost:5173";

// query selectors
const $canvas = document.querySelector(".canvas");
const context = $canvas.getContext('2d');

const $sourceImage = document.querySelector(".source-image");
const $bwButton = document.querySelector(".black-white");
const $presetFilters = document.querySelector(".preset-filters");
const $saveButton = document.querySelector(".save-image");
const $saveAsCopy = document.querySelector(".save-as-copy");
const $resetButton = document.querySelector(".reset-image");

const $brightnessSlider = document.querySelector(".brightness-slider");
const $contrastSlider = document.querySelector(".contrast-slider");
const $greyscaleSlider = document.querySelector(".greyscale-slider");
const $saturationSlider = document.querySelector(".saturation-slider");
const $sepiaSlider = document.querySelector(".sepia-slider");
const $blurSlider = document.querySelector(".blur-slider");
const $drawColor = document.querySelector(".draw-color-select");

//GLOBALS FOR DRAWING
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

/** Given image url, puts saves image in front end and created canvas for editing */
function loadImage() {
  const imgURL = localStorage.getItem("imageURL");
  $sourceImage.src = imgURL;
  $sourceImage.onload = function () {
    $canvas.width = this.width;
    $canvas.height = this.height;
    $canvas.crossOrigin = "anonymous";
    context.drawImage(this, 0, 0);
  };
}


/** Given canvas data, create blob object from canvas, and make API call to save
 * in S3 bucket.
 */
async function saveImage() {
  const canvasData = $canvas.toDataURL("image/png");
  const blobData = dataURItoBlob(canvasData);
  const key = localStorage.getItem('imageKey');

  const formData = new FormData();
  formData.append("image", blobData);


  const response = await fetch(`${API_URL}/images/${key}`, {
    method: 'PUT',
    body: formData
  });

  const result = await response.json();
  console.log(result);
  window.location.href = "index.html";
}
$saveButton.addEventListener("click", saveImage);


/** Save edited image as a copy */
async function saveImageAsCopy() {
  const canvasData = $canvas.toDataURL("image/png");
  const blobData = dataURItoBlob(canvasData);
  const key = localStorage.getItem('imageKey');

  const formData = new FormData();
  formData.append("image", blobData);

  const response = await fetch(`${API_URL}/images`, {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  console.log(result);
  window.location.href = "index.html";
}
$saveAsCopy.addEventListener("click", saveImageAsCopy);


/** Given URI, return a blob object with data from URI */
function dataURItoBlob(dataURI) {
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
}


/** Reset edited image */
function resetImage() {
  $brightnessSlider.value = '100';
  $contrastSlider.value = '100';
  $greyscaleSlider.value = '0';
  $saturationSlider.value = '100';
  $sepiaSlider.value = '0';
  $blurSlider.value = '0';
  applyFilters();
}
$resetButton.addEventListener("click", resetImage);


/** Applies settings for black and white filter and then applies them to canvas */
function applyBlackWhiteFilter() {
  console.log('blackwhite filter');
  $brightnessSlider.value = '120';
  $greyscaleSlider.value = '100';
  $contrastSlider.value = '120';
  applyFilters();
}

/** Applies settings for sepia filter to the canvas image */
function applySepiaFilter() {
  console.log("sepia filter");
  $sepiaSlider.value = '70';
  applyFilters();
}


/** Take argument string settings and applies the settings to the image*/
function applyFilters() {
  console.log("applyFilters");

  const filterString =
    "brightness(" + $brightnessSlider.value + "%" +
    ") contrast(" + $contrastSlider.value + "%" +
    ") grayscale(" + $greyscaleSlider.value + "%" +
    ") saturate(" + $saturationSlider.value + "%" +
    ") sepia(" + $sepiaSlider.value + "%" +
    ") blur(" + $blurSlider.value + "px" +
    ")";
  console.log("filterString", filterString);

  context.filter = filterString;
  context.drawImage($sourceImage, 0, 0);
}

// event delegation for preset filter buttons
$presetFilters.addEventListener("click", (evt) => {
  const $clicked = evt.target;

  if ($clicked.matches('.black-white')) {
    resetImage();
    applyBlackWhiteFilter();
  }

  if ($clicked.matches('.sepia')) {
    resetImage();
    applySepiaFilter();
  }
});


// drawing lines on image when holding down mouse
$canvas.addEventListener('mousedown', (evt) => {
  console.log("painting");
  isPainting = true;
  startX = evt.clientX;
  startY = evt.clientY;
  const canvasOffsetX = $canvas.offsetLeft;
  const canvasOffsetY = $canvas.offsetTop;
  draw(startX, startY, canvasOffsetX, canvasOffsetY);
});

// drawing lines as mouse moves
$canvas.addEventListener('mousemove', (evt) => {

  if (isPainting !== true) return;
  startX = evt.clientX;
  startY = evt.clientY;
  const canvasOffsetX = $canvas.offsetLeft;
  const canvasOffsetY = $canvas.offsetTop;
  draw(startX, startY, canvasOffsetX, canvasOffsetY);
});

// turns off drawing on mouse release
$canvas.addEventListener('mouseup', (evt) => {
  console.log('not painting');
  isPainting = false;
});

/** Draws lines of drawColor color on canvas*/
function draw(x, y, offsetX, offsetY) {
  console.log("drawColor", $drawColor.value);

  context.lineWidth = lineWidth;
  context.strokeStyle = $drawColor.value;
  context.beginPath();
  context.lineCap = 'round';
  context.lineTo(x - offsetX, y - offsetY);
  context.stroke();
}

/** Starts editing */
function start() {
  loadImage();
  window.applyFilters = applyFilters;

}

start();