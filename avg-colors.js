class Color {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;

    this.isDrop = false;
  }

  toString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }

  static fromString(colorString) {
    const rgb = colorString.slice(4).slice(0, -1)
                               .split(', ')
                               .map((num) => parseInt(num));

    return new Color(...rgb);
  }
}

const DELAY = 50;
const WHITE_SHIFT = 0;
const DIMENSIONS = 100;
const SPONTANEOUS_COLOR_THRESHOLD = 0.01;
const INIT_COLOR = () => {
  return new Color(0, 255, 255);
}

const DROP_MORPH = 10;

document.addEventListener('DOMContentLoaded', () => {
  initializeCanvas();

  let colors = initializeColors();

  cycleColors(colors);
});

function initializeCanvas() {
  const canvas = document.getElementById('world');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initializeColors() {

  const colors = [];

  for (let row = 0; row < DIMENSIONS; row++) {
    colors[row] = [];
    for (let col = 0; col < DIMENSIONS; col++) {
      colors[row][col] = INIT_COLOR();
    }
  }

  return colors;
}

let drop = new Color(128, 128, 128);
drop.isDrop = true;

function generateDrop() {
  const newDrop = new Color(drop.red, drop.green, drop.blue);

  newDrop.isDrop = true;
  return newDrop;
}

function updateDropColor() {
  const morph = -DROP_MORPH + Math.floor((Math.random() * DROP_MORPH * 2));

  ['red', 'green', 'blue'].forEach( (hue) => {
    if (Math.random() < 0.33) {
      let shifted = drop[hue] + morph;
      shifted %= 256;

      if (shifted < 0) {
        shifted = 256 + shifted;
      }

      drop[hue] = shifted;
    }
  });
}

function cycleColors(colors) {
  const canvas = document.getElementById('world');

  if (canvas && canvas.getContext) {
    renderColors(canvas, colors);
  }

  colors = generateNextColorSet(colors);

  setTimeout(cycleColors.bind(null, colors), DELAY);
}

function renderColors(canvas, colors) {
  const ctx = canvas.getContext('2d');

  const width  = Math.floor(canvas.width / DIMENSIONS);
  const height = Math.floor(canvas.height / DIMENSIONS);

  for (let row = 0; row < DIMENSIONS; row++) {
    for (let col = 0; col < DIMENSIONS; col++) {
      ctx.fillStyle = colors[row][col].toString();
      ctx.fillRect(col * width, row * height, width, height);
    }
  }
}

function generateNextColorSet(colors) {

  updateDropColor();
  colors = generateNextDropSet(colors);

  colors = generateAverageOfNonDropColors(colors);

  colors = colors.map((row, rowIdx) => {
    return row.map((color, colIdx) => {
      const pos = [rowIdx, colIdx];
      return generateNextColor(colors, pos);
    });
  });

  return colors;
}

function generateNextDropSet(colors) {
  nextColorSet = colors.map((row) => {
    return row.map((color) => {
      if (Math.random() < SPONTANEOUS_COLOR_THRESHOLD) {
        return generateDrop();
      }
      return color;
    });
  });

  return nextColorSet;
}

function generateAverageOfNonDropColors(colors) {
  nextColorSet = colors.map((row, rowIdx) => {
    return row.map((color, colIdx) => {

      if (color.isDrop) {
        return color;
      }

      const pos = [rowIdx, colIdx];
      return generateNextColor(colors, pos);
    });
  });

  return nextColorSet;
};

function generateNextColor(colors, pos) {
  // pos is [row, col]
  // generates next color as average of neighboring colors.
  // randomly generates a random color
  const row = pos[0];
  const col = pos[1];

  let averages = calcAverageNeighborGradients(colors, pos); // return [red, green, blue]

  averages = averages.map((hueCode) => {
    hueCode += WHITE_SHIFT;
    if (hueCode > 255) hueCode = 255;
    return hueCode;
  });

  return new Color(...averages);
}

function calcAverageNeighborGradients(colors, pos) {
  const neighbors = getNeighbors(colors, pos);

  const averageRed   = average(neighbors.map(color => color.red));
  const averageGreen = average(neighbors.map(color => color.green));
  const averageBlue  = average(neighbors.map(color => color.blue));

  return [averageRed, averageGreen, averageBlue].map(
    avg => Math.floor(avg + Math.random() * 4) % 255
  );
}

function getNeighbors(colors, pos) {
  const homeRow = pos[0];
  const homeCol = pos[1];
  const neighbors = [];

  if (colors[homeRow - 1]) {
    for (let i = homeCol - 1; i < homeCol + 2; i++) {
      neighbors.push(colors[homeRow - 1][i]);
    }
  }

  neighbors.push(colors[homeRow][homeCol - 1]);
  neighbors.push(colors[homeRow][homeCol + 1]);

  if (colors[homeRow + 1]) {
    for (let i = homeCol - 1; i < homeCol + 2; i++) {
      neighbors.push(colors[homeRow + 1][i]);
    }
  }

  return neighbors.filter(color => color);
}

function average(numbers) {
  return numbers.reduce((sum, num) => sum + num) / numbers.length;
}

function generateRandomColor() {
  const red   = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue  = Math.floor(Math.random() * 256);

  return new Color(red, green, blue);
}
