import express from "express";
import configRoutes from "./routes/index.js";
import "dotenv/config.js";
import { corsConfig } from "./config/settings.js";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import getUserIdFromJWT from "./websokect/webSocketHelper.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let httpServer = createServer(app);
let io = new Server(httpServer, {cors:corsConfig});

app.use(cookieParser()); 
app.use(cors(corsConfig));
app.use(helmet());

app.use((req, res, next) => {
  req.io = io;
  return next();
});
configRoutes(app);



// req.io.to(userId).emit("task:update", {e:"task-update"});
// req.io.to(userId).emit("score:update", {e:"score-update"});

io.on("connect", (socket) =>{
    const user = getUserIdFromJWT("jwt", socket);
    socket.join(user.id);
  }
)

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      console.log("Database is connected");
      httpServer.listen(process.env.PORT, ()=>{
        console.log("Server is listening on port 4000 localhost");
      });
    } catch (error) {
      console.log(error);
    }
  };
  start(); 

  export default app;