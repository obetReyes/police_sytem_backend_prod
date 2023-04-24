import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getUserService } from "../../users";
import { getManySummariesService} from "../services/summaries.service";
import { prisma } from "../../utils";

export const getManySummariesController = tryCatch(
    async(req:Request, res:Response) => {
    const summarie = req.query.summarie;
    const limit = req.query.limit;
    const starting_after = req.query.starting_after;
    const dbLimit = limit ? Number(limit)  : 20 ;
    const dbStarting_after_extract = starting_after ? Number(starting_after) : 0;
    const dbStarting_after_value = dbStarting_after_extract ? dbStarting_after_extract + 1 : 0;    
    
    const summaries = await getManySummariesService(
        {
            where: {
                incident: {
                    contains: String(summarie)
                }
            },
            skip: dbStarting_after_extract,
            take: dbLimit
        }
    );

    const response = {
        message:summaries,
        limit:dbLimit,
        starting_after:  dbStarting_after_value ? dbStarting_after_value - 1 : 0
    };

}
);