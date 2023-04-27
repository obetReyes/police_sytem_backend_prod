import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getManyReportsService } from "../services/reports.service";
import { prisma } from "../../utils";

export const getManyReportsController = tryCatch(
  async (req: Request, res: Response) => {
    const officer = req.query.officer;
    const event = req.query.event;
    const limit = req.query.limit ?? 100;
    const starting_after = req.query.starting_after ?? 0;

    if (officer && event) {
      throw new CustomError(
        "no se puede hacer una busqueda de reportes  por oficial y por evento al mismo tiempo",
        "",
        400
      );
    }

    const reports = event
      ? await getManyReportsService({
          where: {
            event: {
              contains: String(event),
            },
          },
          skip: Number(starting_after),
          take: Number(limit),
        })
      : officer
      ? await getManyReportsService({
          where: {
            userName: {
              contains: String(officer),
            },
          },
          skip: Number(starting_after),
          take: Number(limit),
        })
      : (() => {
          throw new CustomError(
            "no fue proveido nigun parametro de busqueda por favor agrega el parametro officer o event",
            "",
            400
          );
        })();

    const records = event
      ? await prisma.report.count({
          where: {
            event: {
              contains: String(event),
            },
          },
        })
      : officer
      ? await prisma.report.count({
          where: {
            userName: {
              contains: String(officer),
            },
          },
        })
      : 0;
    
      if(Number(starting_after) > records){
        throw new CustomError("el parametro starting_after no puede ser mayor a la cantidad de records","",400);
      }
    
    const response = {
      message: reports,
      limit: Number(limit),
      records: records,
      starting_after: Number(starting_after),
    };
    return res.status(200).json(response);
  }
);
