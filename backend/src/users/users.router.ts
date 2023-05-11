import express from "express";
import { cache, validator, verifyJwt, verifyRoles } from "../middlewares";
import { userValidator, roles, userUpdateValidator, useQueryValidator, userParamsValidator } from "../utils";
import {
  getUserController,
  deleteUserController,
  getUsersController,
  updateUserController,
  getManyUsersController,
  createUserController,
} from "./controllers";

export const router = express.Router();



router.get("/", verifyJwt, verifyRoles(roles.OPERATOR, roles.DISPATCHER), getUsersController);


router.post("/", verifyJwt, verifyRoles(roles.OPERATOR), validator(userValidator), createUserController);

router.get(
  "/user/:username",
  verifyJwt,
  verifyRoles(roles.DISPATCHER, roles.OPERATOR, roles.OFFICER),
  validator(userParamsValidator),
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
router.get("/many/", verifyJwt, verifyRoles(roles.OPERATOR, roles.DISPATCHER), validator(useQueryValidator), getManyUsersController);