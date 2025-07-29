import { showLogin, showConnecting, showGameScreen, showError } from './ui.js';
import { EaglerWebSocketClient } from './websocket.js';

let client = null;

function start() {
  showLogin(async (username, serverAddress) => {
    showConnecting(serverAddress);
    client = new EaglerWebSocketClient(serverAddress, username);
    
    try {
      await client.connect();
      showGameScreen();
    } catch (err) {
      console.error(err);
      showError('Failed to connect. Please try again.');
    }
  });
  
  window.onDisconnect = () => {
    client.disconnect();
    client = null;
    start();
  };
  
  window.onRetry = () => {
    start();
  };
}

window.onload = start;
