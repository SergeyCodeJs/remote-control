import dotenv from 'dotenv';
dotenv.config();
import { httpServer } from "./src/http_server/index";
import { webSocketServer } from './src/websocket_server/index';

const HTTP_PORT = process.env['PORT'] || 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
webSocketServer.listen();
