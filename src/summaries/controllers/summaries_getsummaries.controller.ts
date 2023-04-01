import { Request, Response } from "express";
import { redis, tryCatch, CustomError } from "../../utils";
import { getUserService } from "../../users";
import { getManySummariesService, getSummariesService } from "../services/summaries.service";


export const getSummariesController = tryCatch(
    async(req:Request, res:Response) => {
        const dispatcher = req.query.dispatcher;
        const limit = req.query.limit;
        const starting_after = req.query.starting_after;

        const dbLimit = limit ? Number(limit)  : 100 ;
        const dbStarting_after_extract = starting_after ? Number(starting_after) : 0;
        const dbStarting_after_value = dbStarting_after_extract ? dbStarting_after_extract + 1 : 0;

        
        const isDispatcher = dispatcher !== undefined ?  await  getUserService({
            name:String(dispatcher)
        }) : null;

        const summaries = dispatcher ? await getManySummariesService(
            {
                skip:dbStarting_after_extract,
                take:dbLimit,
                where:{
                    user:{
                        name:String(dispatcher)
                    }
                }
                
        }) : await getSummariesService({
            take:dbLimit,
            where:{
                id:{
                    gte:dbStarting_after_value
                }
            },
            
        });
        
        if(req.query.dispatcher != undefined &&  isDispatcher?.name == undefined){
            throw new CustomError("reportes", "no existe el emisario solicitado", "",404);
        }

        if(isDispatcher != undefined && summaries!.length >= 0){
        const response = ({
            
                        field:"sumarios",
                        details:summaries,
                        limit:dbLimit,
                        starting_after:dispatcher ? dbStarting_after_extract : dbStarting_after_value ? dbStarting_after_value - 1 : 0

               
        }) ;
        
       
        return res.status(200).json(response);
    }
}
);
