import { Socket, Server } from "socket.io";
import { getGroupService } from "../../../groups";
import { readManyLocationsService, createLocationService } from "../services/location.services";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {io} from "../../../server";
import { NextFunction } from "express";

dotenv.config();

interface JwtPayload {
  info:{
    username: string;
    role: string;
  }
  iat: number;
  exp: number;
  // Add any other properties you want to include in the JWT payload
}

interface ISocket extends Socket {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decodedToken?: JwtPayload;
    // other additional attributes here, example:
    // surname?: string;
}

export const locationGateway = ({io}:{io:Server}) => {
io.use((socket:ISocket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: missing token"));
    }
    try {
        const decoded = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET as string);
        socket.decodedToken = decoded as JwtPayload;
        next();
      } catch (error) {
        return next(new Error("Authentication error: invalid token"));
      }
});


io.on("connection", (socket:ISocket) => {
  const clientIpAddress =  socket.handshake.address;
    console.log(`Socket ${socket.id} connected with token ${socket.decodedToken?.info.username }, address ${clientIpAddress}`);
  
    // Emit a welcome message to the newly connected socket
    socket.emit("welcome", "Welcome!");
  
    // Handle incoming chat messages
    socket.on("message", (message: string) => {
      console.log("message");
    });
  
    // Disconnect event listener
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  });
};