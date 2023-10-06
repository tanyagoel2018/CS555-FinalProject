import express from "express";
import configRoutes from "./routes/index.js";
import "dotenv/config.js";
import { corsConfig } from "./config/settings.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cors(corsConfig));

configRoutes(app);


app.listen(process.env.PORT, ()=>{
    console.log("Server is listening on port 4000 localhost");
})

