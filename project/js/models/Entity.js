class Entity {
  constructor(top, left, width, height, movementSpeed, movementAngle) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.movementSpeed = movementSpeed;
    this.movementAngle = movementAngle; // In degrees, 0 to 360, Trig Unit Circle
    this.movementAngle %= 360;
  }

  getTop() {
    return this.top;
  }

  setTop(top) {
    this.top = top;
  }

  getLeft() {
    return this.left;
  }

  setLeft(left) {
    this.left = left;
  }

  getBottom() {
    return this.top + this.height;
  }

  getRight() {
    return this.left + this.width;
  }

  getWidth() {
    return this.width;
  }

  setWidth(width) {
    this.width = width;
  }

  getHeight() {
    return this.height;
  }
  
  setHeight(height) {
    this.height = height;
  }

  getMovementSpeed() {
    return this.movementSpeed;
  }

  setMovementSpeed(movementSpeed) {
    this.movementSpeed = movementSpeed;
  }

  modifyMovementSpeedByPercent(percent) {
    this.movementSpeed *= percent;
  }

  getMovementAngle() {
    return this.movementAngle;
  }

  setMovementAngle(degrees) {
    this.movementAngle = degrees;
    this.movementAngle %= 360;
  }

  modifyMovementAngle(degrees) {
    this.movementAngle += degrees;
    this.movementAngle %= 360;
  }

  move() {

  }
}