// scripts/main.js
window.onload = function () {
  console.log("ExcloMC Eaglercraft Client starting...");

  // Load config
  fetch('config/client-config.json')
    .then(res => res.json())
    .then(config => {
      initializeClient(config);
    })
    .catch(err => console.error('Failed to load config', err));
};

function initializeClient(config) {
  // Setup game canvas, event handlers, UI, etc.
  console.log("Client config loaded:", config);

  // Example: Load server list and show UI
  fetch('config/servers.json')
    .then(res => res.json())
    .then(servers => {
      setupServerList(servers);
    });
}

function setupServerList(servers) {
  // Create UI elements for server list
  const container = document.getElementById('game-container');
  container.innerHTML = '<h2>Select a Server</h2>';
  servers.forEach(server => {
    let btn = document.createElement('button');
    btn.textContent = `${server.name} - ${server.address}`;
    btn.onclick = () => connectToServer(server.address);
    container.appendChild(btn);
  });
}

function connectToServer(address) {
  alert(`Connecting to ${address}...`);
  // Real connection logic here (WebSocket)
}
