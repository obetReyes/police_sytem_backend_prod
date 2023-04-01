import { Request, Response } from "express";
import { tryCatch,CustomReq, CustomError } from "../../utils";
import { getSummaryService } from "../services/summaries.service";
import { redis } from "../../utils";
export const getSummaryController = tryCatch(
    async(req:CustomReq, res:Response) => {
        const {summaryId} = req.params;
        const getSummary = await getSummaryService({
            id:Number(summaryId)
        });
        if(req.role !== "OPERATOR" && req.role == "DISPATCHER"){
            if(getSummary?.userName !== req.user){
                throw new CustomError("sumarios", "el sumario no se puede obtener debido a que el sumario no le pertence al emisario", "", 401);
            }
        }
        if(getSummary == null){
            throw new CustomError("sumarios", "el sumario no existe", "", 404);
        }


        const response = ({
            
                    field:"sumarios",
                    details:getSummary
               
        });
        redis.set("summaryId", JSON.stringify(response), "EX", 3600);  //cached for 1 hour
        return res.status(200).json(response);
    }
);