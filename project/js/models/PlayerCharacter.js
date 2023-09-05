class PlayerCharacter extends Entity {
  constructor() {
    super(49,28.125,2,2,2,0,'red','pc');
    this.maxHealth = 100;
  }

  constructor(top, left, width, height, movementSpeed, movementAngle, color, maxHealth) {
    super(top, left, width, height, movementSpeed, movementAngle, color);
    this.maxHealth = maxHealth;
  }

  getMaxHealth() {
    return this.maxHealth;
  }

  setMaxHealth(maxHealth) {
    this.maxHealth = maxHealth;
  }

  moveByKeys(keysPressed) { // this should be in controller, eventlistener should be in view
    let up = false;
    let down = false;
    let left = false;
    let right = false;

    for(let i = 0; i < keysPressed; i++) {
      const key = keysPressed[i];
      if(key === 'w' || key === 'W' || key === 'ArrowUp') {
        up = true;
      } else if(key === 's' || key === 'S' || key === 'ArrowDown') {
        down = true;
      } else if(key === 'a' || key === 'A' || key === 'ArrowLeft') {
        left = true;
      } else if(key === 'd' || key === 'D' || key === 'ArrowRight') {
        right = true;
      }
    }

    if(up && down) {
      up = false;
      down = false;
    }

    if(left && right) {
      left = false;
      right = false;
    }

    if(up && left) {
      this.setMovementAngle(135);
    } else if(up && right) {
      this.setMovementAngle(45);
    } else if(down && left) {
      this.setMovementAngle(225);
    } else if(down && right) {
      this.setMovementAngle(315);
    } else if(right) {
      this.setMovementAngle(0);
    } else if(up) {
      this.setMovementAngle(90);
    } else if(left) {
      this.setMovementAngle(180);
    } else if(down) {
      this.setMovementAngle(270);
    }

    if(!up && !down && !left && !right) {
      this.setMovementSpeed(0);
    } else {
      this.movementSpeed = this.defaultMovementSpeed;
    }
  }
}