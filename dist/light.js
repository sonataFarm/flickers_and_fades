Color = require('./color.js');

class Light {
  constructor() {
    this.color = this.setColor();
  }

  setColor() {
    return Color.random();
  }
}

module.exports = Light;
