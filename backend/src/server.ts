import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {Server, createServer, routes, reportError} from "./server.utils";
import { locationGateway } from "./sockets";
import compression from "compression";
import * as dotenv from "dotenv"; 
dotenv.config();
export const app = express();
export const server = createServer(app);

export const io = new Server(server, {
  cors:{
    origin:"http://localhost:5173",
    credentials:true
  }
});





const port = 8000;
app.use(compression()); // Compress all routes
app.use(helmet());
app.disable("x-powered-by");
app.use(
  cors({
    
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));


function main(){
  server.listen(port, () => {
    console.log("startred");
  });
  routes(app);
  locationGateway({io});
}
main();

process.on("uncaughtException", function (err: Error) {
  console.log("Caught exception: " + err);
  reportError(err.message, err.name);
});
process.on("unhandledRejection", (err: Error) => {
  console.log("Caught rejection: " + err);
  reportError(err.message, err.name);
});

