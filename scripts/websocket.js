export class EaglerWebSocketClient {
  constructor(serverAddress, username) {
    this.serverAddress = serverAddress;
    this.username = username;
    this.ws = null;
  }
  
  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.serverAddress);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        // Send initial login packet (simplified example)
        this.ws.send(JSON.stringify({ type: 'login', username: this.username }));
        resolve();
      };
      
      this.ws.onerror = (err) => {
        reject(err);
      };
      
      this.ws.onmessage = (msg) => {
        // TODO: handle incoming packets
        console.log('Received:', msg.data);
      };
      
      this.ws.onclose = () => {
        console.log('Disconnected from server');
        if (typeof this.onDisconnect === 'function') this.onDisconnect();
      };
    });
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
