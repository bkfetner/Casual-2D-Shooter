const content = document.getElementById('content');
const playerCharacter = document.createElement('div');
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

let interval = setInterval(movePlayerCharacter, 16.667);

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
