/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class LightBox {
  constructor(light) {
    this.light = light;
    this.updateColor();
  }

  tick() {
    this.light.tick();
    this.updateColor();
  }

  updateColor() {
    this.color = this.light.color;
  }

}

module.exports = LightBox;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Color = __webpack_require__(4);

class Light {
  constructor() {
    this.color = this.setColor();
  }

  setColor() {
    return Color.random();
  }
}

module.exports = Light;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const DIMENSIONS = 5;

const LightBox = __webpack_require__ (0);
const Flicker = __webpack_require__(3);
const Render = __webpack_require__(5);
const LightBoard = __webpack_require__(6);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Light = __webpack_require__(1);

class Flicker extends Light {
  constructor() {
    this.color = this.setColor();

  }

  setColor() {
    generateRandomColor();
  }
}

module.exports = Flicker;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Render {
  constructor(canvas, lightBoard) {
    this.canvas = canvas;
    this.lightBoard = lightBoard;
    this.ctx = canvas.getContext('2d');
    this.dimensions = this.lightBoard.dimensions;
  }

  renderBoard() {
    this.resizeCanvasToWindow();
    this.ctx.fillText("Hello World",10,50);
    const lightboxWidth  = Math.floor(this.canvas.width / this.dimensions);
    const lightboxHeight = Math.floor(this.canvas.height / this.dimensions);
    this.lightBoard.lightBoxes.forEach((row, rowIdx) => {
      row.forEach((lightBox, colIdx) => {
          this.ctx.fillStyle = lightBox.color.toString();
          this.ctx.fillRect(colIdx * lightboxWidth,
                            rowIdx * lightboxHeight,
                            lightboxWidth,
                            lightboxHeight);
      });
    });
  }

  resizeCanvasToWindow() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

module.exports = Render;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

LightBox = __webpack_require__(0);
Fade = __webpack_require__(7);

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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const BASE_COLOR = new Color(0, 0, 0);
const FADE_RATE = 0.0005;

const FADE_RATE_VARIANCE = 2;
const FADE_RATE_MULTIPLIER = 50;

const COLOR_MAX = 250; // max units of color
const AMPLITUDE = COLOR_MAX / 2; // amplitude of sin wave;

const OFFSET = COLOR_MAX / 2; // offset of sin wave from zero;

const RED_LO = 0.0;
const RED_HI = 0.1;
const GREEN_LO = 0.1;
const GREEN_HI = 0.6;
const BLUE_LO = 0.1;
const BLUE_HI = 0.7;

Light = __webpack_require__(1);

class Fade extends Light {
  constructor() {
    super();

    this.hueBases = {
      red: Math.random() * (RED_HI - RED_LO) + RED_LO,
      green: Math.random() * (GREEN_HI - GREEN_LO) + GREEN_LO,
      blue: Math.random() * (BLUE_HI - BLUE_LO) + BLUE_LO,
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


/***/ })
/******/ ]);