const { createCanvas } = require('canvas');

const initCanvas = (width, height, backgroundColor = '#FFFFFF') => {
  console.log('=== Init canvas...');

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.translate(width / 2,  height / 2);

  console.log('Done.');

  return [canvas, ctx];
};

const drawRadialCircles = (ctx, data, numberScale, opacity) => {
  console.log('=== Draw...');

  ctx.globalAlpha = opacity;

  data.forEach(d => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, numberScale(d.number), 0, 2 * Math.PI, false);
    ctx.fillStyle = d.color;
    ctx.fill();
  });

  console.log('Done.');
};

module.exports = {
  initCanvas,
  drawRadialCircles
};
