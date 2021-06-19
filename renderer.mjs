const WIDTH = 640;
const HEIGHT = 480;

export async function getVideo() {
  try {
    const stream = await navigator.mediaDevices?.getUserMedia({ video: true });
    const video = document.querySelector('.video');

    video.srcObject = stream;
    return video;
  } catch (err) {
    console.error('Error getting video', err);
    return;
  }
}

export async function renderResult(context, video, result) {
  refreshCanvas(context, video);

  if (result && result.length > 0) {
    drawBoxes(context, result);
  }

  return Promise.resolve();
}

function refreshCanvas(context, video) {
  context.fillStyle = '#000000';
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.drawImage(video, 0, 0, WIDTH, HEIGHT);
}

function drawBoxes(context, detections) {
  // detections = [{bbox: [x, y, width, height], class: "person", score: 0.821421}]
  for (let i = 0; i < detections.length; i += 1) {
    const { class: label, bbox } = detections[i];
    const [x, y, boxWidth, boxHeight] = bbox;
    // if (label === 'person') continue;

    context.beginPath();
    context.rect(x, y, boxWidth, boxHeight);
    context.strokeStyle = 'green';
    context.stroke();
    context.closePath();
    context.font = '16px Arial';
    context.fillStyle = 'black';
    context.fillText(label, x + 2, y + 20);
  }
}
