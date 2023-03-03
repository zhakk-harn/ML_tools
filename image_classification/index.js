// IMAGE
// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
let image;

function setup() {
  image = createImg("./img/dog.jpg.webp", imageReady);
}

// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
}

function imageReady() {
  // Make a prediction with a selected image
  classifier.classify(image, (err, results) => {
    console.log(results);
  });
}

// // VIDEO
// let capture;
// let classifier;

// function setup() {
//   capture = createCapture(VIDEO);
//   classifier = ml5.imageClassifier("MobileNet", capture, modelLoaded);
// }

// // When the model is loaded
// function modelLoaded() {
//   console.log("Model Loaded!");
//   classify();
// }

// function classify() {
//   classifier.classify((err, results) => {
//     console.log(results);
//     classify();
//   });
// }
