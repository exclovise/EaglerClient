export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.running = false;

    this.keysPressed = new Set();
    this.mouse = { x: 0, y: 0, down: false };

    this.mods = [];
    this.lastFrameTime = 0;

    this.setupInput();
  }

  setupInput() {
    this.canvas.addEventListener('keydown', e => {
      this.keysPressed.add(e.key);
    });

    this.canvas.addEventListener('keyup', e => {
      this.keysPressed.delete(e.key);
    });

    this.canvas.addEventListener('mousedown', e => {
      this.mouse.down = true;
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });

    this.canvas.addEventListener('mouseup', e => {
      this.mouse.down = false;
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });

    this.canvas.addEventListener('mousemove', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
  }

  registerMod(mod) {
    if (mod && typeof mod.update === 'function' && typeof mod.render === 'function') {
      this.mods.push(mod);
      if (typeof mod.onRegister === 'function') mod.onRegister(this);
    }
  }

  start() {
    this.running = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  stop() {
    this.running = false;
  }

  gameLoop(timestamp) {
    if (!this.running) return;
    const delta = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(delta) {
    // Update all mods
    this.mods.forEach(mod => {
      if (typeof mod.update === 'function') {
        mod.update(delta, this);
      }
    });
  }

  render() {
    // Clear screen
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Render all mods
    this.mods.forEach(mod => {
      if (typeof mod.render === 'function') {
        mod.render(this.ctx, this);
      }
    });
  }
}
