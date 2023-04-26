import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getUserService } from "../../users";
import { getManySummariesService} from "../services/summaries.service";
import { prisma } from "../../utils";

export const getManySummariesController = tryCatch(
    async(req:Request, res:Response) => {
    const dispatcher = req.query.dispatcher;
    const incident = req.query.incident;
    const limit = req.query.limit ?? 100;
    const starting_after = req.query.starting_after ?? 0;

    if(incident  && dispatcher){
        throw new CustomError("no se puede hacer una busqueda de sumarios  por emisario y por incidente al mismo tiempo", "", 400);
    }
    const summaries = incident ? await getManySummariesService(
        {
            where: {
                
                incident: {
                    contains: String(incident)
                }
            },
            skip: Number(starting_after),
            take: Number(limit)
        }
    ) : await getManySummariesService(
        {
            where: {
                userName: {
                    contains: String(dispatcher)
                }
            },
            skip: Number(starting_after),
            take: Number(limit)
        }
    );
    const records =  incident ? await prisma.summary.count({
        where:{
          incident:{
            contains:String(incident)
          }
        }
      }) : await prisma.summary.count({
        where:{
            userName:{
                contains:String(dispatcher)
            }
        }
      });

    const response = {
        message:summaries,
        limit:limit,
        records:records,
        starting_after: starting_after
    };
    return res.status(200).json(response);
}
);