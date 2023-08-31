const content = document.getElementById('content');
const playerCharacter = document.createElement('div');
const enemies = [];
let enemyCount = 0;
let nextEnemyPlacementLeft = 0;
let nextEnemyPlacementTop = 0;
let currentLeft = 100/2; // Initial left position in vw
let currentTop = 56.25/2;  // Initial top position in vw
const moveDistance = 0.2; // The distance to move in vw

let upKey = false;
let rightKey = false;
let downKey = false;
let leftKey = false;

function addPlayerCharacter() {
  playerCharacter.classList.add('playerCharacter');
  playerCharacter.style.width = '2vw';
  playerCharacter.style.height = '2vw';
  // playerCharacter.style.backgroundColor = 'red';
  content.appendChild(playerCharacter);
  updatePlayerCharacterPosition();
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
  if(nextEnemyPlacementLeft == 0 && nextEnemyPlacementTop < 54) {
    nextEnemyPlacementTop += 3;
  } else if(nextEnemyPlacementTop == 54 && nextEnemyPlacementLeft < 96) {
    nextEnemyPlacementLeft += 3;
  } else if(nextEnemyPlacementLeft == 96 && nextEnemyPlacementTop > 0) {
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

    if(currentEnemyTop < currentTop) {
      currentEnemyTop += moveDistance/2;
    } else if(currentEnemyTop > currentTop) {
      currentEnemyTop -= moveDistance/2;
    }

    if(currentEnemyLeft < currentLeft) {
      currentEnemyLeft += moveDistance/2;
    } else if(currentEnemyLeft > currentLeft) {
      currentEnemyLeft -= moveDistance/2;
    }

    enemy.style.left = currentEnemyLeft + 'vw';
    enemy.style.top = currentEnemyTop + 'vw';
    currEnemy.currentEnemyTop = currentEnemyTop;
    currEnemy.currentEnemyLeft = currentEnemyLeft;
  })
}

function updateEnemies() {
  moveEnemies()

  if(enemies.length < 100) {
    addEnemy()
  }
  console.log(enemies);
}

function updatePlayerCharacterPosition() {
  playerCharacter.style.top = currentTop + 'vw';
  playerCharacter.style.left = currentLeft + 'vw';
}

addPlayerCharacter();

function movePlayerCharacter() {
  if(upKey && !downKey) {
    currentTop = Math.max(0, currentTop - moveDistance);
  }
  if(downKey && !upKey) {
    currentTop = Math.min(98, currentTop + moveDistance);
  }
  if(rightKey && !leftKey) {
    currentLeft = Math.min(98, currentLeft + moveDistance);
  }
  if(leftKey && !rightKey) {
    currentLeft = Math.max(0, currentLeft - moveDistance);
  }

  updatePlayerCharacterPosition();
}

function createNeeGameCycle() {
  movePlayerCharacter()
  updateEnemies()
}

let interval = setInterval(createNeeGameCycle, 16.667);

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
