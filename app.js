const content = document.getElementById('content');
const playerCharacter = document.createElement('div');
const bullets = [];
const bulletFireRate = 500;
let lastTimeBulletFired = Date.now();
const enemies = [];
let enemyCount = 0;
let nextEnemyPlacementLeft = 30; // set default to -3
let nextEnemyPlacementTop = 30; // set default to -3
let currentPlayerLeft = 100/2; // Initial left position in vw
let currentPlayerTop = 56.25/2;  // Initial top position in vw
const moveDistance = 0.2; // The distance to move in vw

let upKey = false;
let rightKey = false;
let downKey = false;
let leftKey = false;
let currentPlayerDirection = 'left';

function addPlayerCharacter() {
  playerCharacter.classList.add('playerCharacter');
  playerCharacter.style.width = '2vw';
  playerCharacter.style.height = '2vw';
  playerCharacter.style.backgroundColor = 'red';
  content.appendChild(playerCharacter);
  updatePlayerCharacterPosition();
}

function updatePlayerCharacterPosition() {
  playerCharacter.style.top = currentPlayerTop + 'vw';
  playerCharacter.style.left = currentPlayerLeft + 'vw';
}

function movePlayerCharacter() {
  if(upKey && !downKey) {
    currentPlayerTop = currentPlayerTop - moveDistance;
    currentPlayerDirection = 'up';
  }
  if(downKey && !upKey) {
    currentPlayerTop = currentPlayerTop + moveDistance;
    currentPlayerDirection = 'down';
  }
  if(rightKey && !leftKey) {
    currentPlayerLeft = currentPlayerLeft + moveDistance;
    currentPlayerDirection = 'right';
  }
  if(leftKey && !rightKey) {
    currentPlayerLeft = currentPlayerLeft - moveDistance;
    currentPlayerDirection = 'left';
  }

  updatePlayerCharacterPosition();
}

function evaluatePlayerCharacterCollision() {
  const currentPlayerBottom = currentPlayerTop + 2;
  const currentPlayerRight = currentPlayerLeft + 2;

  if(currentPlayerLeft < 0) currentPlayerLeft = 0;
  if(currentPlayerTop < 0) currentPlayerTop = 0;
  if(currentPlayerBottom > 56.25) currentPlayerTop = 54.25;
  if(currentPlayerRight > 100) currentPlayerLeft = 98;

  enemies.forEach((enemy) => {
    let currEnemy = enemy.div;
    let currentEnemyTop = enemy.currentEnemyTop;
    let currentEnemyLeft = enemy.currentEnemyLeft;
    let currentEnemyBottom = currentEnemyTop + 2;
    let currentEnemyRight = currentEnemyLeft + 2;
    
    if(
      currentPlayerLeft < currentEnemyRight &&
      currentPlayerRight > currentEnemyLeft &&
      currentPlayerTop < currentEnemyBottom &&
      currentPlayerBottom > currentEnemyTop
    ) {
      const leftOverlap = Math.abs(currentPlayerLeft - currentEnemyRight);
      const topOverlap = Math.abs(currentPlayerTop - currentEnemyBottom);
      const rightOverlap = Math.abs(currentPlayerRight - currentEnemyLeft);
      const bottomOverlap = Math.abs(currentPlayerBottom - currentEnemyTop);

      if(currentPlayerLeft < currentEnemyRight && currentPlayerRight > currentEnemyRight) {
        if(currentPlayerTop < currentEnemyBottom && currentPlayerBottom > currentEnemyBottom) {
          if(leftOverlap <= topOverlap) {
            currentPlayerLeft = currentEnemyRight - (leftOverlap/2);
            currentEnemyLeft = currentPlayerLeft - 2;
          } else {
            currentPlayerTop = currentEnemyBottom - (topOverlap/2);
            currentEnemyTop = currentPlayerTop - 2;
          }
        } else if(currentPlayerBottom > currentEnemyTop && currentPlayerTop < currentEnemyTop) {
          if(leftOverlap <= bottomOverlap) {
            currentPlayerLeft = currentEnemyRight - (leftOverlap/2);
            currentEnemyLeft = currentPlayerLeft - 2;
          } else {
            currentPlayerTop = currentEnemyTop - 2 + (bottomOverlap/2);
            currentEnemyTop = currentPlayerTop + 2;
          }
        }
      } else if(currentPlayerRight > currentEnemyLeft && currentPlayerLeft < currentEnemyLeft) {
        if(currentPlayerTop < currentEnemyBottom && currentPlayerBottom > currentEnemyBottom) {
          if(rightOverlap <= topOverlap) {
            currentPlayerLeft = currentEnemyLeft - 2 + (rightOverlap/2);
            currentEnemyLeft = currentPlayerLeft + 2;
          } else {
            currentPlayerTop = currentEnemyBottom - (topOverlap/2);
            currentEnemyTop = currentPlayerTop - 2;
          }
        } else if(currentPlayerBottom > currentEnemyTop && currentPlayerTop < currentEnemyTop) {
          if(rightOverlap <= bottomOverlap) {
            currentPlayerLeft = currentEnemyLeft - 2 + (rightOverlap/2);
            currentEnemyLeft = currentPlayerLeft + 2;
          } else {
            currentPlayerTop = currentEnemyTop - 2 + (bottomOverlap/2);
            currentEnemyTop = currentPlayerTop + 2;
          }
        }
      }
    }

    enemy.currentEnemyTop = currentEnemyTop;
    enemy.currentEnemyLeft = currentEnemyLeft;
    currEnemy.style.top = currentEnemyTop + 'vw';
    currEnemy.style.left = currentEnemyLeft + 'vw';
  })

  updatePlayerCharacterPosition();
}

function addBullet() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.width = '1vw';
  bullet.style.height = '1vw';
  let currentBulletTop = parseFloat(playerCharacter.style.top) + 0.5;
  let currentBulletLeft = parseFloat(playerCharacter.style.left) + 0.5;
  const bulletDirection = currentPlayerDirection;
  const bulletSpeed = 0.4;

  bullet.style.left = currentBulletLeft + 'vw';
  bullet.style.top = currentBulletTop + 'vw';
  bullets.push({div: bullet, currentBulletTop: currentBulletTop, currentBulletLeft: currentBulletLeft, bulletDirection: bulletDirection, bulletSpeed: bulletSpeed});
  content.appendChild(bullet);
}

function moveBullets() {
  bullets.forEach((currBullet) => {
    let bullet = currBullet.div;
    let currentBulletTop = currBullet.currentBulletTop;
    let currentBulletLeft = currBullet.currentBulletLeft;
    let bulletDirection = currBullet.bulletDirection;
    let bulletSpeed = currBullet.bulletSpeed;

    switch(bulletDirection) {
      case 'up':
        currentBulletTop -= bulletSpeed;
        break;
      case 'down':
        currentBulletTop += bulletSpeed;
        break;
      case 'left':
        currentBulletLeft -= bulletSpeed;
        break;
      case 'right':
        currentBulletLeft += bulletSpeed;
        break;
    }

    bullet.style.left = currentBulletLeft + "vw";
    bullet.style.top = currentBulletTop + "vw";
    currBullet.currentBulletLeft = currentBulletLeft;
    currBullet.currentBulletTop = currentBulletTop;
  })
}

function updateBullets() {
  moveBullets()

  const timeNow = Date.now();
  if(timeNow - lastTimeBulletFired >= bulletFireRate) {
    lastTimeBulletFired = timeNow;
    addBullet();
  }
}

function addEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.classList.add('e' + enemyCount);
  enemyCount++;
  enemy.style.width = '2vw';
  enemy.style.height = '2vw';

  let currentEnemyLeft = nextEnemyPlacementLeft;
  let currentEnemyTop = nextEnemyPlacementTop;
  enemy.style.left = currentEnemyLeft + 'vw';
  enemy.style.top = currentEnemyTop + 'vw';
  if(nextEnemyPlacementLeft == -3 && nextEnemyPlacementTop < 57) {
    nextEnemyPlacementTop += 3;
  } else if(nextEnemyPlacementTop == 57 && nextEnemyPlacementLeft < 102) {
    nextEnemyPlacementLeft += 3;
  } else if(nextEnemyPlacementLeft == 102 && nextEnemyPlacementTop > -3) {
    nextEnemyPlacementTop -= 3;
  } else {
    nextEnemyPlacementLeft -=3;
  }

  enemies.push({div: enemy, currentEnemyTop: currentEnemyTop, currentEnemyLeft: currentEnemyLeft});
  content.appendChild(enemy);
}

function moveEnemies() {
  enemies.forEach((currEnemy) => {
    let enemy = currEnemy.div;
    let currentEnemyTop = currEnemy.currentEnemyTop;
    let currentEnemyLeft = currEnemy.currentEnemyLeft;

    if(currentEnemyTop < currentPlayerTop) {
      currentEnemyTop += moveDistance/2;
    } else if(currentEnemyTop > currentPlayerTop) {
      currentEnemyTop -= moveDistance/2;
    }

    if(currentEnemyLeft < currentPlayerLeft) {
      currentEnemyLeft += moveDistance/2;
    } else if(currentEnemyLeft > currentPlayerLeft) {
      currentEnemyLeft -= moveDistance/2;
    }

    enemy.style.left = currentEnemyLeft + 'vw';
    enemy.style.top = currentEnemyTop + 'vw';
    currEnemy.currentEnemyTop = currentEnemyTop;
    currEnemy.currentEnemyLeft = currentEnemyLeft;
  })
}

function updateEnemies() {
  // moveEnemies();

  if(enemies.length < 1) {
    addEnemy();
  }
  // console.log(enemies);
}

function evaluateCollision() {
  evaluatePlayerCharacterCollision();
}

function createNewGameCycle() {
  movePlayerCharacter();
  // updateBullets();
  updateEnemies();
  evaluateCollision();
}

addPlayerCharacter();

let interval = setInterval(createNewGameCycle, 16.667);

document.addEventListener('keydown', keydown)
document.addEventListener('keyup', keyup)

function keydown(e) {
  switch(e.key) {
    case 'ArrowUp':
      upKey = true;
      break;
    case 'ArrowRight':
      rightKey = true;
      break;
    case 'ArrowDown':
      downKey = true;
      break;
    case 'ArrowLeft':
      leftKey = true;
      break;
  }
}

function keyup(e) {
  switch(e.key) {
    case 'ArrowUp':
      upKey = false;
      break;
    case 'ArrowRight':
      rightKey = false;
      break;
    case 'ArrowDown':
      downKey = false;
      break;
    case 'ArrowLeft':
      leftKey = false;
      break;
  }
}
