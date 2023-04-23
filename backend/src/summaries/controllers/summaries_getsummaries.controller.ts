import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getUserService } from "../../users";
import { getManySummariesService, getSummariesService } from "../services/summaries.service";
import { prisma } from "../../utils";

export const getSummariesController = tryCatch(
    async(req:Request, res:Response) => {
        const dispatcher = req.query.dispatcher;
        const limit = req.query.limit;
        const starting_after = req.query.starting_after;

        const dbLimit = limit ? Number(limit)  : 20 ;
        const dbStarting_after_extract = starting_after ? Number(starting_after) : 0;
        const dbStarting_after_value = dbStarting_after_extract ? dbStarting_after_extract + 1 : 0;
        
        
        const isDispatcher = dispatcher !== undefined ?  await  getUserService({
            name:String(dispatcher)
        }) : null;

        const summaries = isDispatcher ? await getManySummariesService(
            {
                skip:dbStarting_after_extract,
                take:dbLimit,
                where:{
                    user:{
                        name:isDispatcher.name
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
        
        if(dispatcher &&  isDispatcher?.name == undefined){
            throw new CustomError("no existe el emisario solicitado", "",404);
        }

        
        const response = {
                        message:summaries,
                        limit:dbLimit,
                        records: isDispatcher?.name ? await prisma.summary.count({
                            where:{
                                userName:isDispatcher.name
                            }
                        }) : await prisma.summary.count(),
                        starting_after: isDispatcher?.name ? dbStarting_after_extract : dbStarting_after_value ? dbStarting_after_value - 1 : 0
        };
        
       
        return res.status(200).json(response);
}
);
