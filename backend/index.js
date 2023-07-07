import express from "express";
import helmet from "helmet";
import cors from "cors";

import { allowedOrigin, port } from "./env.dev.js";
import router from "./src/routes.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: allowedOrigin,
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
