import { Request, Response } from "express";
import { tryCatch, CustomReq, CustomError, redis} from "../../utils";
import { getReportService } from "../services/reports.service";

export const  getReportController = tryCatch(
    async(req:CustomReq, res:Response) => {
        const {reportId} = req.params;
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

        const response = (
                {
                    field:"reportes",
                    details:getReport
                }
        );

        redis.set("reportId", JSON.stringify(response), "EX", 3600);  //cached for 1 hour
        return res.status(200).json(response);      
    }
);
