class GameView {
  static WIDTH_RATIO = 16;
  static HEIGHT_RATIO = 9;

  constructor(entities) {
    this.gameWidth = 0;
    this.gameHeight = 0;
    this.updateViewSize();

    this.entities = entities;
  }

  updateViewSize() { // do I do this in controller? or app.js
    const browserWidth = window.innerWidth;
    const browserHeight = window.innerHeight;

    if(browserWidth / WIDTH_RATIO >= browserHeight / HEIGHT_RATIO) {
      this.gameHeight = browserHeight;
      this.gameWidth = (browserHeight * WIDTH_RATIO) / HEIGHT_RATIO;
    } else {
      this.gameWidth = browserWidth;
      this.gameHeight = (browserWidth * HEIGHT_RATIO) / WIDTH_RATIO;
    }
  }
}