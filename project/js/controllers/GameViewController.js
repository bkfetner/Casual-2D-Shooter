import { GameView } from '../views/GameView.js';
import { PlayerCharacter } from '../models/PlayerCharacter.js';

class GameViewController {
  constructor() {
    this.gameView = new GameView();
    const pc = new PlayerCharacter();
    pc.setColor('red');
    this.gameView.addEntity(pc);
  }

  getEntities() {
    return this.gameView.getEntities();
  }
}