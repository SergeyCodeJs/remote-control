import { httpServer } from './http_server/index';
import { webSocketServer } from './websocket_server/index';

function closeServers() {
  console.log('Servers closed');
  webSocketServer.closeServer();
  httpServer.close();
}

export { closeServers }