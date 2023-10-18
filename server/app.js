import express from "express";
import configRoutes from "./routes/index.js";
import "dotenv/config.js";
import { corsConfig } from "./config/settings.js";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/dbConnection.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors(corsConfig));
app.use(helmet());
configRoutes(app);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database is connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port 4000 localhost");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
