import { GameViewController } from './js/controllers/GameViewController.js';

// Frame timing variables
const maxFps = 60;
let lastTime = performance.now();
const minCycleTime = 1000/maxFps;

// container size variables
const widthRatio = 16;
const heightRatio = 9;
let currentLayout = '';

// Create Controllers
const gameViewController = new GameViewController();

// Game Loop
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  // Update game logic here

  if(deltaTime > minCycleTime) {
    // Render game here

    // Grab container size, everything will scale to this
    const container = document.querySelector('.container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Clear all divs
    const entityDivs = document.querySelectorAll('.entity');
    entityDivs.forEach((div) => {
      div.remove();
    });

    const entities = gameViewController.getEntities();
    entities.forEach((entity) => {
      if(entity instanceof PlayerCharacter) {
        const pcDiv = document.createElement('div');
        pcDiv.classList.add('entity');
        pcDiv.style.width = containerWidth * (entity.getWidth() / 100) + 'px';
        pcDiv.style.height = containerWidth * (entity.getHeight() / 100) + 'px';
        pcDiv.style.backgroundColor = entity.getColor();
        pcDiv.style.top = containerWidth * (entity.getTop() / 100) + 'px';
        pcDiv.style.bottom = containerWidth * (entity.getBottom() / 100) + 'px';
        content.appendChild(pcDiv);
      }
    });

    //check container with screen ratio
    checkAndAdjustGamePosition();

    lastTime = timestamp;
  }

  // default 60 fps, maybe?
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);



//check container with screen ratio
function checkAndAdjustGamePosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  if(currentLayout !== 'portrait' && screenWidth / widthRatio <= screenHeight / heightRatio) {
    const container = document.querySelector('.container');
    console.log(container);
    if(container.classList.contains('container-landscape')) {
      container.classList.remove('container-landscape');
    }
    container.classList.add('container-portrait');
    currentLayout = 'portrait';
  } else if(currentLayout !== 'landscape' && screenHeight / heightRatio < screenWidth / widthRatio) {
    const container = document.querySelector('.container');
    console.log(container);
    if(container.classList.contains('container-portrait')) {
      container.classList.remove('container-portrait');
    }
    container.classList.add('container-landscape');
    currentLayout = 'landscape';
  }
}