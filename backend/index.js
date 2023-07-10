import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from 'http';

import { allowedOrigin, port } from "./env.dev.js";
import { sequelize } from "./src/model.js";
import router from "./src/routes.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: allowedOrigin,
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);

app.use(router);

await sequelize.sync();

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
