import express from "express";
import helmet from "helmet";
import cors from "cors";

import { allowedOrigin, port} from "./env.dev.js";
import router from "./routes/routes.js";


const corsOptions = {
    origin: allowedOrigin,
  };

const app = express();

app.use(express.json());
app.use(router)

app.use(helmet());

app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });