LightBox = require('./lightbox.js');
Fade = require('./fade.js');

const DIMENSIONS = 50;

class LightBoard {
  constructor() {
    this.lightBoxes = [];
    this.dimensions = DIMENSIONS;

    for (let row = 0; row < DIMENSIONS; row++) {
      this.lightBoxes[row] = [];

      for (let col = 0; col < DIMENSIONS; col++) {
        // assign random fades and flashes here
        // for now default to fades
        this.lightBoxes[row][col] = new LightBox(new Fade());
      }
    }
  }

  update() {
    this.lightBoxes.forEach(function(row) {
      row.forEach(function(lightBox) {
        lightBox.tick();
      });
    });
  }
}

module.exports = LightBoard;

Math.random();
