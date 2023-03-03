// called by vosk
function onPartial(partial) {
  console.log("partial:", partial);
}

// called by vosk
function onFullMessage(message) {
  console.log("message:", message);
}

// called by vosk
function onPartialAndFull(data) {
  if (
    data.includes("vert") ||
    data.includes("vers") ||
    data.includes("ver") ||
    data.includes("verre")
  ) {
    fill(0, 170, 0);
  } else if (data.includes("rouge") || data.includes("bouge")) {
    fill(170, 0, 0);
  } else if (data.includes("bleu") || data.includes("bleu")) {
    fill(0, 0, 170);
  }
}

// called by p5
function setup() {
  createCanvas(720, 400);
  fill(120);
  noStroke();
}

// called by p5
function draw() {
  rect(0, 0, width, height);
}
