// src/server.ts
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { initializeSocket } from './sockets/socket';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});


app.get('/', (req, res) => {
  res.send('Board Game App Server is running!');
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

initializeSocket(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
