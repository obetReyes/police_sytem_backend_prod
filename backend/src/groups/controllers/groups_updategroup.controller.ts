import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { updateGroupService } from "../services/groups.service";

export const updateGroupController = tryCatch(
    async (req: Request, res: Response) => {
        const { name, newName, area } = req.body;
        const updateGroup = await updateGroupService({
            data: {
                name: newName,
                area: area,
            },
            where: {
                name: name
            }
        });
        res.status(200).json(
          
                {
                message: updateGroup
                }
            
        );
    }
);