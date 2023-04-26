import express from "express";
import { cache, validator, verifyJwt, verifyRoles } from "../middlewares";
import { userValidator, roles, userUpdateValidator } from "../utils";
import {
  getUserController,
  deleteUserController,
  getUsersController,
  updateUserController,
  getManyUsersController,
} from "./controllers";

export const router = express.Router();

router.get("/", verifyJwt, verifyRoles(roles.OPERATOR), getUsersController);

router.get(
  "user/:username",
  verifyJwt,
  verifyRoles(roles.DISPATCHER, roles.OPERATOR, roles.OFFICER),
  validator(userValidator),
  cache("username"),
  getUserController
);

router.put(
  "/",
  verifyJwt,
  verifyRoles(roles.OPERATOR),
  validator(userUpdateValidator),
  updateUserController
);
router.delete(
  "/:username",
  verifyJwt,
  verifyRoles(roles.OPERATOR),
  validator(userValidator),
  deleteUserController
);
router.get("/many/", getManyUsersController);