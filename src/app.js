import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import taskRouter from "./routes/task.routes.js";
import {PORT, MONGODB_URI, TOKEN_SECRET, FRONTEND_URL} from "./config/config.js";

//Settings
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.set("port", PORT);

//Middlewares
app.use(
    cors({
      origin: "http://127.0.0.1:5173",
      credentials: true
    })
  );
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  //Routes
  app.use("/api", authRouter);
  app.use("/api", productsRouter);
  app.use("/api", taskRouter);
  export default app;