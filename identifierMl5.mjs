const video = document.querySelector('.video');
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let intervall;

const WIDTH = 640;
const HEIGHT = 480;

navigator.mediaDevices
  ?.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => console.error('errroroo', err));

// function drawImage() {
//   ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
// }

// video.addEventListener('play', () => {
//   intervall = setInterval(drawImage, 20);
// });
// video.addEventListener('paused', () => {
//   clearInterval(intervall);
// });
// video.addEventListener('ended', () => {
//   clearInterval(intervall);
// });

const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

const objectDetector = ml5.objectDetector('cocossd', onModelReady);

function onModelReady() {
  console.info('Model ready!');
  objectDetector.detect(video, handleResult);
}

function handleResult(err, result) {
  if (err) {
    console.error('Error detecting objects', err);
    return;
  }

  // Clear part of the canvas
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);

  if (result && result.length > 0) {
    drawBox(result);
  }

  objectDetector.detect(video, handleResult);
}

function drawBox(detections) {
  for (let i = 0; i < detections.length; i += 1) {
    const { label, height: boxHeight, x, y, width: boxWidth } = detections[i];
    if (label === 'person') continue;

    ctx.beginPath();
    ctx.rect(x, y, boxWidth, boxHeight);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(label, x + 2, y + 20);
  }
}
