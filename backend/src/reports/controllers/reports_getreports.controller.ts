import { Request, Response } from "express";
import { tryCatch, CustomError, prisma } from "../../utils";
import { getUserService } from "../../users";
import {
  getManyReportsService,
  getReportsService,
} from "../services/reports.service";

interface customReq extends Request {
  user?: string;
  role?: string;
}

// cambiar aqui en vez de pedir el officer pedir la cookie si la cookie es distinta a operator no poder pedir officer y bucar solo los datos del username del officer
export const getReportsController = tryCatch(
  async (req: customReq, res: Response) => {
    const officer = req.query.officer;
    const limit = req.query.limit;
    const starting_after = req.query.starting_after;

    const dbLimit = limit ? Number(limit) : 20;
    const dbStarting_after_extract = starting_after
      ? Number(starting_after)
      : 0;
    const dbStarting_after_value = dbStarting_after_extract
      ? dbStarting_after_extract + 1
      : 0;

    let reports;
  
        
    const isOfficer =
    officer !== undefined && req.role != "OFFICER"
      ? await getUserService({
          name: String(officer),
        })
      : null;

    if (req.role == "OFFICER") {
      reports = await getManyReportsService({
        skip: dbStarting_after_extract,
        take: dbLimit,
        where: {
          user: {
            name: String(req.user),
          },
        },
      });
    }else{
      if(isOfficer){
        reports =  await getManyReportsService({
          skip: dbStarting_after_extract,
          take: dbLimit,
          where: {
            user: {
              name:isOfficer?.name,
            },
          },
        });
      }else{
        reports = await getReportsService({
          take: dbLimit,
          where: {
            id: {
              gte: dbStarting_after_value,
            },
          },
        });
        
    }
    if (req.query.officer != undefined && isOfficer?.name == undefined) {
      throw new CustomError("no existe el oficial solicitado", "", 404);
    }
  }
    /* if  the officer name is found in the db we will send the response or if an officer name wasn't given all the reports will be sent ) */
    const response = {
      message:reports,
      limit: dbLimit,
      records: req.role == "OFFICER" ?  await prisma.report.count({
        where:{
          userName:String(req.user)
        }
      }) : isOfficer?.name  ? await prisma.report.count({
        where:{
          userName:isOfficer.name
        }
      }) : await prisma.report.count(),
      starting_after: isOfficer?.name
        ? dbStarting_after_extract
        : dbStarting_after_value
        ? dbStarting_after_value - 1
        : 0,
    };
    // if it does not work later change to send instead of json
    return res.status(200).json(response);
    
  }
);