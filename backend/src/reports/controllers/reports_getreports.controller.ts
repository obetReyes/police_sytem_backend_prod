import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getUserService} from "../../users";
import { getManyReportsService, getReportsService } from "../services/reports.service";


export const getReportsController = tryCatch(
    async(req:Request, res:Response) => {
        const officer = req.query.officer;
        const limit = req.query.limit;
        const starting_after = req.query.starting_after;
        
        const dbLimit = limit ? Number(limit)  : 100;
        const dbStarting_after_extract = starting_after ? Number(starting_after) : 0;
        const dbStarting_after_value = dbStarting_after_extract ? dbStarting_after_extract + 1 : 0;
    
          /* if an agent query is given it means is not undefined, the  ternary operator will check  if the agent exists in the db otherwise give the costant a null value */ 
        const isOfficer = officer !== undefined ?  await  getUserService({
            name:String(officer)
        }) : null;

        const reports = officer ? await getManyReportsService({
            skip:dbStarting_after_extract,
            take:dbLimit,
            where:{
                user:{
                    name:String(officer)
                }
            }
        }) :  await getReportsService({
            take:dbLimit,
            where:{
                id:{
                    gte:dbStarting_after_value
                }
            },
        });

        /* if the an officer name was given the db will retrieve the data but if the officer does not exists we will throw an error */
        if(req.query.officer != undefined &&  isOfficer?.name == undefined){
            throw new CustomError("no existe el oficial solicitado", "", 404);
        }
        /* if  the officer name is found in the db we will send the response or if an officer name wasn't given all the reports will be sent ) */
        if(isOfficer?.name || req.query.officer == undefined){
            
        const response = (
                {
                   
                    message:reports,
                    limit:dbLimit,
                    starting_after: isOfficer?.name ? dbStarting_after_extract : dbStarting_after_value ? dbStarting_after_value - 1 : 0
                }
            
        );
        // if it does not work later change to send instead of json
        return res.status(200).json(response);
    }
    }
);

