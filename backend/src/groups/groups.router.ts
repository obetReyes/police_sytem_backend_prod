import express from "express";
import { createGroupController, updateUserGroupController, deleteGroupController, getGroupController, getGroupsController, updateGroupController } from "./controllers";
import { validator, verifyRoles, cache, verifyJwt } from "../middlewares";
import { roles, groupValidator, groupParamsValidator, groupUpdateValidator, userGroupValidator } from "../utils";
import { getLimiter, createLimiter, updateLimiter, deleteLimiter } from "../utils";
export const router = express.Router();

router.post("/", createLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(groupValidator), createGroupController);
router.get("/:group", verifyJwt, getLimiter, validator(groupParamsValidator),cache("group"), getGroupController);
router.get("/", getLimiter, verifyJwt, getGroupsController);
router.put("/", updateLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(groupUpdateValidator), updateGroupController);
router.put("/update-user-group", updateLimiter, verifyJwt,  verifyRoles(roles.OPERATOR), validator(userGroupValidator), updateUserGroupController);
router.delete("/:group", deleteLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(groupParamsValidator), deleteGroupController);



