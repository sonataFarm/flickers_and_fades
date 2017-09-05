const DELAY = 10;
const COLOR_SHIFT = 50;
const DIMENSIONS = 100;

document.addEventListener('DOMContentLoaded', () => {
  const colors = [generateRandomColor()];

  initializeCanvas();

  for (let i = 0; i < DIMENSIONS**2; i++) {
    padWithRelatedColor(colors);
  }

  cycleRandomColors(colors);
});

function colorShift() {

}

function initializeCanvas() {
  const canvas = document.getElementById('world');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function padWithRelatedColor(colors) {
  const oldColor = colors[0];

  const newColor = generateNextColor(oldColor);

  colors.unshift(newColor);
}

function generateNextColor(colorString) {
  const rgb = parseColorString(colorString);

  const shiftedRgb = rgb.map(shiftGradient);

  return renderColorString(...shiftedRgb);
}

function parseColorString(colorString) {
  return colorString.slice(4).slice(0, -1)
                             .split(', ')
                             .map((num) => parseInt(num));
}

function shiftGradient(color) {
  let shift = -COLOR_SHIFT + Math.floor(Math.random() * 2 * COLOR_SHIFT);

  if (color + shift > 255 || color + shift < 0) {
    shift = -shift;
  }

  return color + shift;
}

function cycleRandomColors(colors) {
  const canvas = document.getElementById('world');

  if (canvas && canvas.getContext) {
    renderColors(canvas, colors);
  }
  colors.pop();
  padWithRelatedColor(colors);

  setTimeout(cycleRandomColors.bind(null, colors), DELAY);
}

function renderColors(canvas, colors) {
  const ctx = canvas.getContext('2d');

  const width  = Math.floor(canvas.width / DIMENSIONS);
  const height = Math.floor(canvas.height / DIMENSIONS);

  for (let y = 0; y < DIMENSIONS; y ++) {
    const even = (y % 2 === 0 ? true : false)
    for (let x = 0; x < DIMENSIONS; x++) {
      ctx.fillStyle = colors[y * DIMENSIONS + x];
      ctx.fillRect(x * width, y * height, width, height);
    }
  }
}

function generateRandomColor() {
  const red   = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue  = Math.floor(Math.random() * 256);

  return renderColorString(red, green, blue);
}

function renderColorString(red, green, blue) {
  return `rgb(${red}, ${green}, ${blue})`;
}
