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
