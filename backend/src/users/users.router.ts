import express from "express";
import { cache, validator, verifyJwt, verifyRoles } from "../middlewares";
import { userValidator, roles } from "../utils";
import { getUserController, deleteUserController, getUsersController } from "./controllers";



export const router = express.Router();

router.get("/", verifyJwt, verifyRoles(roles.OPERATOR), getUsersController);

router.get("/:username", verifyJwt, verifyRoles(roles.DISPATCHER, roles.OPERATOR, roles.OFFICER),validator(userValidator), cache("username"), getUserController);

router.delete("/:username", verifyJwt,verifyRoles(roles.OPERATOR),validator(userValidator),  deleteUserController);