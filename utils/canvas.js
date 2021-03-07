const { createCanvas } = require('canvas');

const initCanvas = (width, height, backgroundColor = '#FFFFFF', center = false) => {
  console.log('=== Init canvas...');

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  if (center) ctx.translate(width / 2,  height / 2);

  console.log('Done.');

  return [canvas, ctx];
};

const drawRadialLines = (ctx, data, segmentScale, dateScale, opacity, lineWidth) => {
  console.log('=== Draw...');

  ctx.globalAlpha = opacity;
  ctx.lineWidth = lineWidth;

  data.forEach(d => {
    if (!isNaN(d.hsv.h)) {
      const startAngle = segmentScale(d.hsv.h) + Math.PI / 32 / 2;
      const endAngle = segmentScale(d.hsv.h) + 2 * Math.PI / 32 / 2;

      ctx.beginPath();
      ctx.arc(0, 0, dateScale(d.created_at), startAngle, endAngle, false);
      ctx.strokeStyle = d.hex;
      ctx.stroke();
    }
  });

  console.log('Done.');
};

const drawBarLines = (ctx, userData, widthScale, userScale, opacity, lineWidth, maxOffset) => {
  console.log('=== Draw...');

  ctx.globalAlpha = opacity;
  ctx.lineWidth = lineWidth;

  userData.forEach(user => {
    const { start, step } = userScale(user.index);
    let pos = start;
    for (let i = 0; i < user.n; i++) {
      ctx.beginPath();
      ctx.moveTo(widthScale(0) + Math.random() * maxOffset, pos);
      ctx.lineTo(widthScale(1) - Math.random() * maxOffset, pos);
      ctx.strokeStyle = user.uniqueColors[i].hex;
      ctx.stroke();

      pos += step;
    }

    ctx.beginPath();
    ctx.moveTo(widthScale(1) + 3, pos);
    ctx.lineTo(widthScale(1) + 13, pos);
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
  });

  console.log('Done.');
};

module.exports = {
  initCanvas,
  drawRadialLines,
  drawBarLines
};
