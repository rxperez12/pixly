/** FUNCTIONS FOR EDIT HTML */
const API_URL = "http://localhost:3000";

// query selectors
const $canvas = document.querySelector(".canvas");
const context = $canvas.getContext('2d');

const $sourceImage = document.querySelector(".source-image");
const $bwButton = document.querySelector(".black-white");
const $presetFilters = document.querySelector(".preset-filters");
const $saveButton = document.querySelector(".save-image");


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

async function saveImage() {
  const canvasData = $canvas.toDataURL("image/png");
  const blobData = dataURItoBlob(canvasData);
  console.log("blobData", blobData);
  const params = {
    Key: localStorage.getItem("imageKey"),
    ContentType: "image/png",
    Body: blobData
  };
  const response = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  const result = await response.json();
  console.log(result);
}
$saveButton.addEventListener("click", saveImage);

function dataURItoBlob(dataURI) {
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  for(let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/png'});
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