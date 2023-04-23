import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {Server, createServer, routes} from "./server.utils";
import { locationGateway } from "./sockets";
import { seed } from "./utils/seed";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
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
    console.log(`[Server]: I am running at http://localhost:${port}`);
  });
  routes(app);
  locationGateway({io});
  if (process.env.NODE_ENV === "development") {
   // use this only when is your frist time running the server seed();
  }  
}
main();

process.on("uncaughtException", function (err: Error) {
  console.error(new Date().toUTCString() + "uncaughtException:", err.message);
  console.error(err.stack);
});
process.on("unhandledRejection", (err: Error) => {
  console.log("--------------------------", err);
 
});

