// Frame timing variables
const maxFps = 60;
let lastTime = performance.now();
const minCycleTime = 1000/maxFps;

// coontainer size variables
const widthRatio = 16;
const heightRatio = 9;
let currentLayout = '';


// Game Loop
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  // Update game logic here

  if(deltaTime > minCycleTime) {
    // Render game here

    //check container with screen ratio
    checkAndAdjustGamePosition();

    lastTime = timestamp;
  }

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