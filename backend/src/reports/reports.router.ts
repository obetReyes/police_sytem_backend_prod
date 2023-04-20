import express from "express";
import { cache, validator, verifyJwt, verifyRoles } from "../middlewares";
import { reportParamsValidator, reportQueryValidator, reportValidator,
     roles, createLimiter, getLimiter } from "../utils";
import { createReportController, getReportController, getReportsController } from "./controllers";

export const router = express.Router();

router.get("/:reportId", getLimiter, verifyJwt, verifyRoles(roles.OFFICER, roles.OPERATOR, roles.OPERATOR),validator(reportParamsValidator), cache("reportId"),  getReportController);
router.post("/", createLimiter, verifyJwt, verifyRoles(roles.OFFICER), validator(reportValidator), createReportController);
router.get("/", /*getLimiter,*/ verifyJwt, verifyRoles(roles.OFFICER, roles.OPERATOR, roles.DISPATCHER), validator(reportQueryValidator), getReportsController);

