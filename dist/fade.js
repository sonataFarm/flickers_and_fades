const BASE_COLOR = new Color(0, 0, 0);
const FADE_RATE = 0.0005;

const FADE_RATE_VARIANCE = 2;
const FADE_RATE_MULTIPLIER = 50;

const COLOR_MAX = 250; // max units of color
const AMPLITUDE = COLOR_MAX / 2; // amplitude of sin wave;

const OFFSET = COLOR_MAX / 2; // offset of sin wave from zero;

Light = require('./light.js');

class Fade extends Light {
  constructor() {
    super();

    this.hueBases = {
      red: Math.random(),
      green: Math.random(),
      blue: Math.random()
    };

    this.color = this.initializeColor();
    this.sinInput = 0;
    this.fadeCycles = 0;
  }

  tick() {
    this.sinInput += (FADE_RATE / Math.random() * FADE_RATE_VARIANCE)
    const sinMultiplier = this.generateSinMultiplier();
    this.color = this.updateColor(sinMultiplier);
  }

  updateColor(sinMultiplier) {
    let rgb = [
      this.hueBases.red,
      this.hueBases.green,
      this.hueBases.blue
    ];

    rgb = rgb.map((hueCode) => {
      return Math.floor(hueCode * sinMultiplier);
    });

    return new Color(...rgb);
  }

  initializeColor() {
    return new Color(0, 0, 0);
  }

  updateColor(sinMultiplier) {
    let rgb = [
      this.hueBases.red,
      this.hueBases.green,
      this.hueBases.blue
    ];

    rgb = rgb.map((hueCode) => {
      return Math.floor(hueCode * sinMultiplier);
    });

    return new Color(...rgb);
  }

  generateSinMultiplier() {
    return AMPLITUDE * Math.sin(this.sinInput * FADE_RATE_VARIANCE) + OFFSET;
  }
}

module.exports = Fade;
