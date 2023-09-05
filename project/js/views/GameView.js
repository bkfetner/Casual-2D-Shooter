class GameView {
  constructor() {
    this.backgroundColor = 'lightgrey';
    this.backgroundWidth = 100;
    this.backgroundHeight = 100;
    this.backgroundBorderColor = 'darkgrey';
    this.backgroundBorderWidth = 5;
    this.entities;
    this.lastTimeUpdated = performance.now();
  }

  getBackgroundColor() {
    return this.backgroundColor;
  }

  setBackGroundColor(color) {
    this.backgroundColor = color;
  }

  getEntities() {
    return entities;
  }

  setEntities(entities) {
    this.entities = entities;
  }

  addEntity(entity) {
    this.entities.push(entity);
  }
}