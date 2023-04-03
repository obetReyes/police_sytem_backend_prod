import { Request, Response } from "express";
import { tryCatch, CustomReq, CustomError, redis} from "../../utils";
import { getReportService } from "../services/reports.service";

export const  getReportController = tryCatch(
    async(req:CustomReq, res:Response) => {
        const {reportId} = req.params;

    // Check if report data already exists in cache
    const cachedReport = await redis.get(`report:${reportId}`);
    if (cachedReport) {
      const response = {
        field: "reportes",
        details: JSON.parse(cachedReport),
      };
      return res.status(200).json(response);
    }

        const getReport = await getReportService({
            id:Number(reportId)
        });
        if(req.role !== "OPERATOR" && req.role == "OFFICER"){
            if(getReport?.userName !== req.user){
                throw new CustomError("reportes", "el reporte no se puede obtener debido a que el reporte no le pertence al oficial", "", 401);
            }
        }

        if(getReport == null){
            throw new CustomError("reportes", "el reporte no existe", "", 404);
        }


         // Store report data in cache for future requests
    await redis.set(`report:${reportId}`, JSON.stringify(getReport), "EX", 300); //cached for 5 minutes

        const response = (
                {
                    field:"reportes",
                    details:getReport
                }
        );

        return res.status(200).json(response);      
    }
);
