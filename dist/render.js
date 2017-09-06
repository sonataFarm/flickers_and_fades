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
