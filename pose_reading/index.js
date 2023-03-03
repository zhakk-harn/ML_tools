let video;
let poseNet;

function setup() {
  video = createCapture(VIDEO, captureReady);
}

function captureReady() {
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", (results) => {
    poses = results;
    console.log(poses);
  });
}

// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
}
