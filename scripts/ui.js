import { createElement } from './utils.js';

const app = document.getElementById('app');

export function showLogin(onLogin) {
  app.innerHTML = '';
  const usernameInput = createElement('input', { placeholder: 'Enter Username' });
  const serverSelect = createElement('select');
  
  // Load server list dynamically later (here hardcoded for demo)
  fetch('../config/servers.json')
    .then(res => res.json())
    .then(servers => {
      for (const s of servers) {
        serverSelect.appendChild(createElement('option', { value: s.address }, s.name));
      }
    });
  
  const loginBtn = createElement('button', { onClick: () => {
    if (usernameInput.value.trim() === '') {
      alert('Please enter a username.');
      return;
    }
    onLogin(usernameInput.value.trim(), serverSelect.value);
  } }, 'Connect');
  
  app.append(
    createElement('h2', {}, 'Welcome to ExcloMC Eaglercraft Client'),
    usernameInput,
    serverSelect,
    loginBtn
  );
}

export function showConnecting(serverAddress) {
  app.innerHTML = `<h2>Connecting to ${serverAddress}...</h2>`;
}

export function showGameScreen() {
  app.innerHTML = `
    <h2>Connected! Game screen placeholder</h2>
    <p>(Game canvas would appear here.)</p>
    <button id="disconnectBtn">Disconnect</button>
  `;
  
  document.getElementById('disconnectBtn').onclick = () => {
    // To be handled externally
    if (typeof window.onDisconnect === 'function') {
      window.onDisconnect();
    }
  };
}

export function showError(message) {
  app.innerHTML = `
    <h2 style="color:#ff4444">Error</h2>
    <p>${message}</p>
    <button id="retryBtn">Retry</button>
  `;
  document.getElementById('retryBtn').onclick = () => {
    if (typeof window.onRetry === 'function') {
      window.onRetry();
    }
  };
}
