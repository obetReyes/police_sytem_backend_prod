import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getManyReportsService } from "../services/reports.service";
import { prisma } from "../../utils";


export const getManyReportsController = tryCatch(
    async(req:Request, res:Response) => {
    const officer = req.query.officer;
    const event = req.query.event;
    const limit = req.query.limit;
    const starting_after = req.query.starting_after;

    if(officer && event){
        throw new CustomError("no se puede hacer una busqueda de reportes  por oficial y por evento al mismo tiempo", "", 400);
    }
    const reports =  event ? await getManyReportsService(
        {
            where: {
                event: {
                    contains: String(event)
                }
            },
            skip: Number(starting_after),
            take: Number(limit)
        }
    ) : await getManyReportsService({
        where:{
            userName:{
                contains:String(officer)
            }
        },
        skip:Number(starting_after),
        take:Number(limit)
    });

    const records =  event ? await prisma.report.count({
        where:{
          event:{
            contains:String(event)
          }
        }
      }) : await prisma.report.count({
        where:{
            userName:{
                contains:String(officer)
            }
        }
      });

      console.log(reports);
    const response = {
        message:reports,
        limit:limit,
        records:records,
        starting_after: starting_after
    };
    return res.status(200).json(response);
}
);