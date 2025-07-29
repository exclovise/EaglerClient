import { showLogin, showConnecting, showError, showGameScreenWithCanvas } from './ui.js';
import { EaglerWebSocketClient } from './websocket.js';
import { Game } from './game.js';

// Example mod: shows FPS counter and a moving rectangle controlled by arrow keys
const exampleMod = {
  x: 50,
  y: 50,
  speed: 150,
  fps: 0,
  frames: 0,
  elapsed: 0,
  onRegister(game) {
    console.log("Example mod registered.");
  },
  update(delta, game) {
    // Simple movement with arrow keys
    if (game.keysPressed.has('ArrowLeft')) this.x -= this.speed * delta;
    if (game.keysPressed.has('ArrowRight')) this.x += this.speed * delta;
    if (game.keysPressed.has('ArrowUp')) this.y -= this.speed * delta;
    if (game.keysPressed.has('ArrowDown')) this.y += this.speed * delta;

    // FPS calculation
    this.elapsed += delta;
    this.frames++;
    if (this.elapsed >= 1) {
      this.fps = this.frames;
      this.frames = 0;
      this.elapsed = 0;
    }
  },
  render(ctx, game) {
    // Draw player rectangle
    ctx.fillStyle = '#ffb400';
    ctx.fillRect(this.x, this.y, 30, 30);

    // Draw FPS
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.fillText(`FPS: ${this.fps}`, 10, 20);
  }
};

let client = null;
let game = null;

function start() {
  showLogin(async (username, serverAddress) => {
    showConnecting(serverAddress);
    client = new EaglerWebSocketClient(serverAddress, username);

    try {
      await client.connect();

      // Show game screen with canvas
      const canvas = showGameScreenWithCanvas();

      // Initialize and start game
      game = new Game(canvas);
      game.registerMod(exampleMod);
      game.start();

    } catch (err) {
      console.error(err);
      showError('Failed to connect. Please try again.');
    }
  });

  window.onDisconnect = () => {
    if (client) client.disconnect();
    if (game) game.stop();
    client = null;
    game = null;
    start();
  };

  window.onRetry = () => {
    start();
  };
}

window.onload = start;
