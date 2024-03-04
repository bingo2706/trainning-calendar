import app from './app';
import http from 'http';
import config from './config/config';
const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);
});
