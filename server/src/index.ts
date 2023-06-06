import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import apiRoutes from "./routes/api";
import { register } from "./controllers/auth";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.post("/auth/register", register);
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

if (!process.env.MONGO_URL) {
  console.error("The MONGODB_URI environment variable is not defined");
  process.exit(1);
}

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
