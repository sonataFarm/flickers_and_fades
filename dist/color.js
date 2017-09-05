const COLOR_MAX = 255;

class Color {

  static random() {
    const red = Color.randomRGBValue();
    const green = Color.randomRGBValue();
    const blue = Color.randomRGBValue();

    return new Color(red, green, blue);
  }

  static randomRGBValue() {
    return Math.floor((Math.random() * COLOR_MAX));
  }

  static fromString(colorString) {
    const rgb = colorString.slice(4).slice(0, -1)
    .split(', ')
    .map((num) => parseInt(num));

    return new Color(...rgb);
  }

  static randomHue() {
    const hues = ['red', 'green', 'blue'];
    const randIdx = Math.random() * hues.length;

    return hues[randIdx];
  }

  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;

    this.isDrop = false;
  }

  toString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }
}

module.exports = Color;
