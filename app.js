const content = document.getElementById('content');
let bullets = [];
const bulletFireRate = 250;
let bulletcount = 0;
let lastTimeBulletFired = Date.now();
let lastBulletDirection = 'up';
let enemies = [];
let enemySpawnLocations = [];
let enemyCount = 0;
const enemyLimit = 50;
let nextEnemyPlacementLeft = -3; // set default to -3
let nextEnemyPlacementTop = -3; // set default to -3
let playerHealth = 100;
let currentPlayerLeft = 100/2; // Initial left position in vw
let currentPlayerTop = 56.25/2;  // Initial top position in vw
const moveDistance = 0.2; // The distance to move in vw

let upKey = false;
let rightKey = false;
let downKey = false;
let leftKey = false;
let currentPlayerDirection = 'left';

function addPlayerCharacter() {
  const playerCharacter = document.createElement('div');
  playerCharacter.classList.add('playerCharacter');
  playerCharacter.style.width = '2vw';
  playerCharacter.style.height = '2vw';
  playerCharacter.style.backgroundColor = 'red';
  content.appendChild(playerCharacter);
  playerCharacter.style.top = currentPlayerTop + 'vw';
  playerCharacter.style.left = currentPlayerLeft + 'vw';
}

function updatePlayerCharacterPosition() {
  playerCharacter.style.top = currentPlayerTop + 'vw';
  playerCharacter.style.left = currentPlayerLeft + 'vw';
}

function movePlayerCharacter() {
  const playerCharacter = document.querySelector('.playerCharacter');
  // console.log(playerCharacter);

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

  playerCharacter.style.top = currentPlayerTop + 'vw';
  playerCharacter.style.left = currentPlayerLeft + 'vw';
}

function evaluatePlayerCharacterCollision() {
  const playerCharacter = document.querySelector('.playerCharacter');
  const enemies = document.querySelectorAll('.enemy');

  const currentPlayerBottom = currentPlayerTop + 2;
  const currentPlayerRight = currentPlayerLeft + 2;

  enemies.forEach((enemy) => {
    let currentEnemyTop = parseFloat(enemy.style.top);
    let currentEnemyLeft = parseFloat(enemy.style.left);
    let currentEnemyBottom = currentEnemyTop + 2;
    let currentEnemyRight = currentEnemyLeft + 2;
    
    if(
      currentPlayerLeft < currentEnemyRight &&
      currentPlayerRight > currentEnemyLeft &&
      currentPlayerTop < currentEnemyBottom &&
      currentPlayerBottom > currentEnemyTop
    ) {
      playerHealth -= 1;
      let p = document.querySelector('.p');
      p.innerHTML = 'Health: ' + playerHealth + '%';

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

    enemy.style.top = currentEnemyTop + 'vw';
    enemy.style.left = currentEnemyLeft + 'vw';
  })

  if(currentPlayerLeft < 0) currentPlayerLeft = 0;
  if(currentPlayerTop < 0) currentPlayerTop = 0;
  if(currentPlayerBottom > 56.25) currentPlayerTop = 54.25;
  if(currentPlayerRight > 100) currentPlayerLeft = 98;

  playerCharacter.style.top = currentPlayerTop + 'vw';
  playerCharacter.style.left = currentPlayerLeft + 'vw';
}

function addBullet() {
  const playerCharacter = document.querySelector('.playerCharacter');

  const bullet = document.createElement('div');
  const id = 'bullet' + bulletcount;
  bullet.classList.add('bullet');
  bullet.setAttribute('id', id);
  bulletcount++;
  bullet.style.width = '1vw';
  bullet.style.height = '1vw';
  let currentBulletTop = parseFloat(playerCharacter.style.top) + 0.5;
  let currentBulletLeft = parseFloat(playerCharacter.style.left) + 0.5;
  let bulletDirection = 'up';
  if(lastBulletDirection === 'up') {
    bulletDirection = 'right';
    lastBulletDirection = 'right';
  } else if(lastBulletDirection === 'right') {
    bulletDirection = 'down';
    lastBulletDirection = 'down';
  } else if(lastBulletDirection === 'down') {
    bulletDirection = 'left';
    lastBulletDirection = 'left';
  } else {
    bulletDirection = 'up';
    lastBulletDirection = 'up';
  }
  const bulletSpeed = moveDistance * 2;

  bullet.setAttribute('bulletDirection', bulletDirection);
  bullet.setAttribute('bulletSpeed', bulletSpeed);
  bullet.style.left = currentBulletLeft + 'vw';
  bullet.style.top = currentBulletTop + 'vw';
  // console.log(bullet);
  // console.log(currentBulletTop + " " + currentBulletLeft + " " + bulletDirection + " " + bulletSpeed);
  content.appendChild(bullet);
}

function moveBullets() {
  const bullets = document.querySelectorAll('.bullet');

  bullets.forEach((bullet) => {
    // console.log(bullet);
    let currentBulletTop = parseFloat(bullet.style.top);
    let currentBulletLeft = parseFloat(bullet.style.left);
    let bulletDirection = bullet.getAttribute('bulletDirection');
    let bulletSpeed = parseFloat(bullet.getAttribute('bulletSpeed'));

    // console.log(currentBulletTop + " " + currentBulletLeft + " " + bulletDirection + " " + bulletSpeed);
    // console.log(bulletDirection);

    switch(bulletDirection) {
      case 'up':
        // console.log('switch up');
        currentBulletTop -= bulletSpeed;
        break;
      case 'down':
        // console.log('switch down');
        currentBulletTop += bulletSpeed;
        break;
      case 'left':
        // console.log('switch left');
        currentBulletLeft -= bulletSpeed;
        break;
      case 'right':
        // console.log('switch right');
        currentBulletLeft += bulletSpeed;
        break;
    }

    if(currentBulletTop < -10 || currentBulletTop > 57.5 || currentBulletLeft < -10 || currentBulletLeft > 110) {
      bullet.remove();
    } else {
      bullet.style.left = currentBulletLeft + "vw";
      bullet.style.top = currentBulletTop + "vw";
    }
  })
}

function updateBullets() {
  moveBullets();

  const timeNow = Date.now();
  if(timeNow - lastTimeBulletFired >= bulletFireRate) {
    lastTimeBulletFired = timeNow;
    addBullet();
  }
}

function addEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  const id = 'enemy' + enemyCount;
  enemyCount++;
  enemy.setAttribute('id', id);
  enemy.style.width = '2vw';
  enemy.style.height = '2vw';

  // set up spawn locations
  if(enemySpawnLocations.length === 0) {
    for(let i = -3; i <= 102; i++) {
      enemySpawnLocations.push({col: i, row: -3});
      enemySpawnLocations.push({col: i, row: 57});
    }
    for(let j = 0; j <= 54; j++) {
      enemySpawnLocations.push({col: -3, row: j});
      enemySpawnLocations.push({col: 102, row: j});
    }
    for(let i = 0; i < enemySpawnLocations.length; i++) {
      let rand = Math.floor(Math.random() * enemySpawnLocations.length);
      let temp = enemySpawnLocations[rand];
      enemySpawnLocations[rand] = enemySpawnLocations[i];
      enemySpawnLocations[i] = temp;
    }
  }

  let spawnLocation = enemySpawnLocations[0];
  enemySpawnLocations.splice(0, 1);
  let currentEnemyLeft = spawnLocation.col;
  let currentEnemyTop = spawnLocation.row;
  enemy.style.left = currentEnemyLeft + 'vw';
  enemy.style.top = currentEnemyTop + 'vw';
  content.appendChild(enemy);
}

function moveEnemies() {
  const enemies = document.querySelectorAll('.enemy');
  // console.log(enemies);

  enemies.forEach((enemy) => {
    // console.log(enemy.id);
    let currentEnemyTop = parseFloat(enemy.style.top);
    let currentEnemyLeft = parseFloat(enemy.style.left);

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

    // playerCharacter.style.top = currentPlayerTop + 'vw';
    // playerCharacter.style.left = currentPlayerLeft + 'vw';

    enemy.style.left = currentEnemyLeft + 'vw';
    enemy.style.top = currentEnemyTop + 'vw';
  })
}

function updateEnemies() {
  moveEnemies();

  const enemies = document.querySelectorAll('.enemy');
  if(enemies.length < enemyLimit) {
    addEnemy();
  }
  // console.log(enemies);
}

function evaluateEnemyVsEnemyCollision() {
  const enemies = document.querySelectorAll('.enemy');

  enemies.forEach((enemyOne, enemyOneIndex) => {
    const enemyOneId = enemyOne.id;

    enemies.forEach((enemyTwo, enemyTwoIndex) => {
      const enemyTwoId = enemyTwo.id;

      if(enemyOneId !== enemyTwoId) {
        let currentEnemyTopOne = parseFloat(enemyOne.style.top);
        let currentEnemyLeftOne = parseFloat(enemyOne.style.left);
        let currentEnemyBottomOne = currentEnemyTopOne + 2;
        let currentEnemyRightOne = currentEnemyLeftOne + 2;

        let currentEnemyTopTwo = parseFloat(enemyTwo.style.top);
        let currentEnemyLeftTwo = parseFloat(enemyTwo.style.left);
        let currentEnemyBottomTwo = currentEnemyTopTwo + 2;
        let currentEnemyRightTwo = currentEnemyLeftTwo + 2;

        if(
          currentEnemyLeftOne < currentEnemyRightTwo &&
          currentEnemyRightOne > currentEnemyLeftTwo &&
          currentEnemyTopOne < currentEnemyBottomTwo &&
          currentEnemyBottomOne > currentEnemyTopTwo
        ) {
          const leftOverlap = Math.abs(currentEnemyLeftOne - currentEnemyRightTwo);
          const topOverlap = Math.abs(currentEnemyTopOne - currentEnemyBottomTwo);
          const rightOverlap = Math.abs(currentEnemyRightOne - currentEnemyLeftTwo);
          const bottomOverlap = Math.abs(currentEnemyBottomOne - currentEnemyTopTwo);

          if(currentEnemyLeftOne < currentEnemyRightTwo && currentEnemyRightOne > currentEnemyRightTwo) {
            if(currentEnemyTopOne < currentEnemyBottomTwo && currentEnemyBottomOne > currentEnemyBottomTwo) {
              if(leftOverlap <= topOverlap) {
                currentEnemyLeftOne = currentEnemyRightTwo - (leftOverlap/2);
                currentEnemyLeftTwo = currentEnemyLeftOne - 2;
              } else {
                currentEnemyTopOne = currentEnemyBottomTwo - (topOverlap/2);
                currentEnemyTopTwo = currentEnemyTopOne - 2;
              }
            } else if(currentEnemyBottomOne > currentEnemyTopTwo && currentEnemyTopOne < currentEnemyTopTwo) {
              if(leftOverlap <= bottomOverlap) {
                currentEnemyLeftOne = currentEnemyRightTwo - (leftOverlap/2);
                currentEnemyLeftTwo = currentEnemyLeftOne - 2;
              } else {
                currentEnemyTopOne = currentEnemyTopTwo - 2 + (bottomOverlap/2);
                currentEnemyTopTwo = currentEnemyTopOne + 2;
              }
            }
          } else if(currentEnemyRightOne > currentEnemyLeftTwo && currentEnemyLeftOne < currentEnemyLeftTwo) {
            if(currentEnemyTopOne < currentEnemyBottomTwo && currentEnemyBottomOne > currentEnemyBottomTwo) {
              if(rightOverlap <= topOverlap) {
                currentEnemyLeftOne = currentEnemyLeftTwo - 2 + (rightOverlap/2);
                currentEnemyLeftTwo = currentEnemyLeftOne + 2;
              } else {
                currentEnemyTopOne = currentEnemyBottomTwo - (topOverlap/2);
                currentEnemyTopTwo = currentEnemyTopOne - 2;
              }
            } else if(currentEnemyBottomOne > currentEnemyTopTwo && currentEnemyTopOne < currentEnemyTopTwo) {
              if(rightOverlap <= bottomOverlap) {
                currentEnemyLeftOne = currentEnemyLeftTwo - 2 + (rightOverlap/2);
                currentEnemyLeftTwo = currentEnemyLeftOne + 2;
              } else {
                currentEnemyTopOne = currentEnemyTopTwo - 2 + (bottomOverlap/2);
                currentEnemyTopTwo = currentEnemyTopOne + 2;
              }
            }
          }
        }

        enemyOne.style.top = currentEnemyTopOne + 'vw';
        enemyOne.style.left = currentEnemyLeftOne + 'vw';
        enemyTwo.style.top = currentEnemyTopTwo + 'vw';
        enemyTwo.style.left = currentEnemyLeftTwo + 'vw';
      }
    })
  })
}

function evaluateEnemyVsBulletCollision() {
  const enemies = document.querySelectorAll('.enemy');
  const bullets = document.querySelectorAll('.bullet');

  let deadEnemies = [];
  let deadBullets = [];
  enemies.forEach((enemy) => {
    let currentEnemyTop = parseFloat(enemy.style.top);
    let currentEnemyLeft = parseFloat(enemy.style.left);
    let currentEnemyBottom = currentEnemyTop + 2;
    let currentEnemyRight = currentEnemyLeft + 2;

    bullets.forEach((bullet) => {
      let currentBulletTop = parseFloat(bullet.style.top);
      let currentBulletLeft = parseFloat(bullet.style.left);
      let currentBulletBottom = currentBulletTop + 2;
      let currentBulletRight = currentBulletLeft + 2;
      // console.log(currentBulletTop + " " + currentBulletLeft + " " + currentBulletBottom + " " + currentBulletRight);

      if(
        currentBulletLeft < currentEnemyRight &&
        currentBulletRight > currentEnemyLeft &&
        currentBulletTop < currentEnemyBottom &&
        currentBulletBottom > currentEnemyTop
      ) {
        deadEnemies.push(enemy);
        deadBullets.push(bullet);
        // bullet.remove();
      }
    })
  })
  // if(deadEnemies.length > 0) {
  //   console.log(deadEnemies);
  // }
  deadEnemies.forEach((enemy) => {
    enemy.remove();
  })
  deadBullets.forEach((bullet) => {
    bullet.remove();
  })
}

function evaluateCollision() {
  evaluatePlayerCharacterCollision();
  evaluateEnemyVsBulletCollision();
  evaluateEnemyVsEnemyCollision();
}

function displayGameOver() {
  const gameOver = document.createElement('div');
  gameOver.classList.add('gameover');
  gameOver.style.width = '70vw';
  gameOver.style.height = '35vw';
  gameOver.style.backgroundColor = 'white';
  gameOver.style.opacity = '0.8';
  gameOver.style.fontSize = '15vw';
  gameOver.style.textAlign = 'center';
  gameOver.innerHTML = 'GAME OVER';
  content.appendChild(gameOver);
}

function createNewGameCycle() {
  movePlayerCharacter();
  updateBullets();
  updateEnemies();
  evaluateCollision();

  console.log(playerHealth);
  if(playerHealth <= 0) {
    clearInterval(interval);
    displayGameOver();
  }
}

addPlayerCharacter();

let interval = setInterval(createNewGameCycle, 16.666);

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
