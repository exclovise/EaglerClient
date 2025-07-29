const app = document.getElementById('app');

export function showLogin(onLogin) {
  app.innerHTML = '';
  const usernameInput = document.createElement('input');
  usernameInput.placeholder = 'Enter Username';

  const serverSelect = document.createElement('select');

  // Load server list dynamically
  fetch('./config/servers.json')
    .then(res => res.json())
    .then(servers => {
      for (const s of servers) {
        const option = document.createElement('option');
        option.value = s.address;
        option.textContent = s.name;
        serverSelect.appendChild(option);
      }
    });

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Connect';
  loginBtn.onclick = () => {
    if (usernameInput.value.trim() === '') {
      alert('Please enter a username.');
      return;
    }
    onLogin(usernameInput.value.trim(), serverSelect.value);
  };

  app.append(
    Object.assign(document.createElement('h2'), { textContent: 'Welcome to ExcloMC Eaglercraft Client' }),
    usernameInput,
    serverSelect,
    loginBtn
  );
}

export function showConnecting(serverAddress) {
  app.innerHTML = `<h2>Connecting to ${serverAddress}...</h2>`;
}

export function showGameScreenWithCanvas() {
  app.innerHTML = `
    <h2>ExcloMC Eaglercraft Client</h2>
    <canvas id="gameCanvas" width="640" height="360" tabindex="0"></canvas>
    <br/>
    <button id="disconnectBtn">Disconnect</button>
  `;

  const canvas = document.getElementById('gameCanvas');
  canvas.focus();

  document.getElementById('disconnectBtn').onclick = () => {
    if (typeof window.onDisconnect === 'function') window.onDisconnect();
  };

  return canvas;
}

export function showError(message) {
  app.innerHTML = `
    <h2 style="color:#ff4444">Error</h2>
    <p>${message}</p>
    <button id="retryBtn">Retry</button>
  `;
  document.getElementById('retryBtn').onclick = () => {
    if (typeof window.onRetry === 'function') window.onRetry();
  };
}
