import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsernameIPkey, limiterConsecutiveFailsByUsernameAndIP, limiterSlowBruteByIP, maxConsecutiveFailsByUsernameAndIP ,maxWrongAttemptsByIPperDay } from "../../utils";
import {updateTokenService } from "../services/auth.services";
import { getUserService } from "../../users";
//signin controller is used to logIn an user in the app using jwt rotation tokens.

export const signInController =tryCatch(
    async (req: Request, res: Response) => {
    
      setImmediate(() => {
        throw new Error("Internal Server Error");
      });
    }
  );
  