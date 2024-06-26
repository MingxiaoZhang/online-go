// src/server.ts
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { initializeSocket } from './sockets/socket';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import roomRoutes from './routes/roomRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// Allow requests from all origins during development (replace with specific origins in production)
app.use(cors({
  origin: 'http://localhost:5173',  // Update with your frontend URL
  credentials: true,  // If you're using cookies or sessions
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Board Game App Server is running!');
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);

initializeSocket(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
