import { EventEmitter } from 'events';

export default function socket(io) {
  io.sockets.on('error', (e) => console.log(e));
  io.sockets.on('connection', (socket) => {
    socket.on('room', (room) => {
      socket.join(room);
    });

    const videoChunks = new EventEmitter().setMaxListeners(5);

    socket.on('chunk', (chunk) => {
      videoChunks.emit('new', chunk);
    });

  });
}
