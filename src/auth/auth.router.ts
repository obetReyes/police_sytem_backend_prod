import express from "express";
import { signInController, signOutController, signUpDispatcherController, signUpOfficerController, signUpSuperiorController, tokenController } from "./controllers";
import { validator, verifyJwt, verifyRoles } from "../middlewares";
import { roles, signInValidator, signUpOfficerValidator, signUpValidator } from "../utils";
import { tokenLimiter } from "../utils";
import { deleteLimiter, createLimiter, } from "../utils";
export const router = express.Router();
router.post("/signin", validator(signInValidator), signInController);
router.post("/signup-superior", createLimiter, validator(signUpValidator), signUpSuperiorController);
router.post("/signup-dispatcher",createLimiter,  verifyJwt, verifyRoles(roles.OPERATOR), validator(signUpValidator), signUpDispatcherController);
router.post("/signup-officer",createLimiter,  verifyJwt,  verifyRoles(roles.OPERATOR), validator(signUpOfficerValidator), signUpOfficerController);
router.get("/signout", deleteLimiter, signOutController);
router.get("/update-token", /*tokenLimiter,*/  tokenController);
