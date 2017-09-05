Light = require('./light.js');

class Flicker extends Light {
  constructor() {
    this.color = this.setColor();

  }

  setColor() {
    generateRandomColor();
  }
}

module.exports = Flicker;
