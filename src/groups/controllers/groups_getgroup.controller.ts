import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { getGroupService } from "../services/groups.service";
import { CustomError } from "../../utils";
import { redis } from "../../utils";

export const getGroupController = tryCatch(
    async (req: Request, res: Response) => {
        const { group } = req.params;
        const getGroup = await getGroupService({
            name: group
        });

        if(getGroup  == null){
            throw new CustomError("el grupo no existe", "", 404);
        }

            // Store report data in cache for future requests
    await redis.set(`report:${group}`, JSON.stringify(getGroup), "EX", 300); //cached for 5 minutes
        const response = (
                {
                    messsage: getGroup,
                }
        );
        return res.status(200).json(response);
    }
);
