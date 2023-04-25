import { Request, Response } from "express";
import { tryCatch } from "./custom_trycatch.utils";

interface customReq extends Request{
    user?: string;
    role?: string;
}
/*
export const getManyRecords  = (controller:unknown) =>  tryCatch(
    async (req: customReq, res: Response) => {
    const entry = req.query.entry;
    const limit = req.query.limit;
    const starting_after = req.query.starting_after;

    const dbLimit = limit ? Number(limit) : 20;
    const dbStarting_after_extract = starting_after
      ? Number(starting_after)
      : 0;
    const dbStarting_after_value = dbStarting_after_extract
      ? dbStarting_after_extract + 1
      : 0;
    
    let entries;
    return{
        entry,
        limit,
        starting_after

    };
    }
);
*/
//params here to make the available to the function that is using the getManyRecords
export const getManyRecords = (getReportsData: (req: customReq, res:Response, limit: number, skip: number, skippedRecords:number) => Promise<unknown>) =>
  tryCatch(async (req: customReq, res: Response) => {
    
    const entry = req.query.entry;
    const limit = req.query.limit;
    const skip = req.query.starting_after;

    const recordsLimit = limit ?? 20;
    const skippedRecords = skip
      ? Number(skip)
      : 0;
    const currentRecords = skippedRecords
      ? skippedRecords + 1
      : 0;
      await getReportsData(req, res, Number(recordsLimit), currentRecords, skippedRecords);
  });
