import { createServer } from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { dirname } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import api from './src/routes/api.js';
import socket from './src/socket.js';
import dotenv from 'dotenv';
const __dirname = dirname(fileURLToPath(import.meta.url)); // Define __dirname

dotenv.config();
const port = process.env.PORT || '8088';

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.raw({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

// Mount API routes
api(app);

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.error(err);
  console.log('Connected to MongoDB');
});

// Serve Angular
app.use('/', express.static(path.join(__dirname, '/../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// Set up HTTP Server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

// Hand off socket.io to socket.js
socket(io);

httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
