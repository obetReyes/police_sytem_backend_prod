import express from "express";
import { getSummaryController, getSummariesController,createSummaryController } from "./controllers";
import { roles, summaryValidator, summaryParamsValidator, summaryQueryValidator,  createLimiter, getLimiter } from "../utils";
import { verifyJwt, verifyRoles, cache, validator } from "../middlewares";

export const router = express.Router();

router.post("/", createLimiter, verifyJwt, verifyRoles(roles.DISPATCHER), validator(summaryValidator), createSummaryController);
router.get("/:summaryId", getLimiter, verifyJwt, verifyRoles(roles.OPERATOR, roles.DISPATCHER), validator(summaryParamsValidator), cache("summaryId"), getSummaryController);
router.get("/", getLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(summaryQueryValidator), getSummariesController);