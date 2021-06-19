import { getVideo, renderResult } from './renderer.mjs';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const model = await cocoSsd.load();

const maxNumBoxes = 20;
const minScore = 0.5;

const video = await getVideo();

video?.addEventListener('loadeddata', analyseVideo);

async function analyseVideo() {
  const result = await model.detect(video, maxNumBoxes, minScore); // [{bbox: [x, y, width, height], class: "person", score: 0.821421}]
  await renderResult(ctx, video, result);
  setTimeout(analyseVideo, 100);
}
