const DIMENSIONS = 5;

const LightBox = require ('./lightbox.js');
const Flicker = require('./flicker.js');
const Render = require('./render.js');
const LightBoard = require('./lightboard.js');

const DELAY = 100;
board = new LightBoard();
canvas = document.getElementById('world');
render = new Render(canvas, board);

function tick() {
  board.update();
  render.renderBoard();

  setTimeout(tick, DELAY);
}

tick();
