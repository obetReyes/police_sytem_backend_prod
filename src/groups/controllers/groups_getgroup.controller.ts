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
            throw new CustomError("grupos", "el grupo no existe", "", 404);
        }

        const response = ({
            data: [
                {
                    field: "grupos",
                    details: getGroup
                }
            ]
        });
        redis.set("group", JSON.stringify(response), "EX", 900);
        return res.status(200).json(response);
    }
);
