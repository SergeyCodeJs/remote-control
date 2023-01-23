import internal from 'node:stream';
import * as ws from 'ws';
import { handler } from './handler/handler';

const host = 'localhost';
const port = process.env.hasOwnProperty('WEBSOCKET_PORT') ? +process.env['WEBSOCKET_PORT']! : 8082;

class WebSocketServer {
  host: string;
  port: number;
  webSocketServer: ws.Server<ws.WebSocket> | undefined;
  webSocketStream: internal.Duplex | undefined;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  listen() {
    this.createServer();
  }

  createServer() {
    if (!this.webSocketServer) {
      this.webSocketServer = new ws.WebSocketServer({
        host,
        port
      });
      this.addServerListeners();
      return this.webSocketServer;
    } 
    return this.webSocketServer;
  }

  getServer() {
    return this.webSocketServer ? this.webSocketServer : this.createServer();
  }

  createWebSocketStream(streamClient: ws.WebSocket) {
    const webSocketStream = ws.createWebSocketStream(streamClient, { 
      decodeStrings: false, 
      encoding: 'utf8' 
    });
    this.webSocketStream = webSocketStream;

    return this.webSocketStream;
  }

  getWebsocketStream(streamClient: ws.WebSocket) {
    if (this.webSocketStream) {
      return this.webSocketStream;
    }
    return this.createWebSocketStream(streamClient);
  }

  addServerListeners() {
    this.webSocketServer!.on('listening', () => this.onListening());
    this.webSocketServer!.on('connection', (streamClient: ws.WebSocket) => this.onConnection(streamClient));
  }

  addStreamListeners(streamClient: ws.WebSocket) {
    this.getWebsocketStream(streamClient).on('data', async (command: string, streamClient: ws.WebSocket) => await this.onData(command, streamClient));
    streamClient.on('close', this.onClose);
  }

  onListening() {
    const serverAddress = this.getServer().address();
    console.log('webSocketServer started on: ', serverAddress);
  }

  onConnection(streamClient: ws.WebSocket) {
    this.addStreamListeners(streamClient);
  }

  async onData(command: string, streamClient: ws.WebSocket) {
    const [firstCommandWord, ...restCommandWords] = command.split(' ');
    const commandHandler = this.getHandler(firstCommandWord!);
    this.runCommandHandler(commandHandler, restCommandWords, streamClient);
    console.log(command, restCommandWords, streamClient);
    //TODO ADD HANDLER
  }

  async runCommandHandler(handler: any, args: any, streamClient: ws.WebSocket) {
    if (typeof handler !== 'function') {
      return;
    }

    try {
      const res = await handler(+args[0], this.getWebsocketStream(streamClient), args);
      console.log('res ' + res);
    } catch(error) {
      console.error(error);
    }
  }

  onClose() {
    console.log('disconnected');
  }

  closeServer() {
    this.webSocketServer?.clients.forEach((client: ws.WebSocket) => client.close());
    this.webSocketServer?.close((err: Error | undefined) => console.log(err));
  }

  getHandler = (command: string) => {
    switch (command) {
        case 'mouse_up': return handler.mouseUp;
        case 'mouse_right': return handler.mouseRight;
        case 'mouse_down': return handler.mouseDown;
        case 'mouse_left': return handler.mouseLeft;
        case 'mouse_position': return handler.mousePosition;
        case 'draw_circle': return handler.drawCircle;
        case 'draw_square': return handler.drawSquare;
        case 'draw_rectangle': return handler.drawRectangle;
        case 'prnt_scrn': return handler.printScreen;
        default: return async () => {};
    }
}
}

const webSocketServer = new WebSocketServer(host, port);

export {webSocketServer};