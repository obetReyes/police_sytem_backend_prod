import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { getGroupsService } from "../services/groups.service";

export const getGroupsController = tryCatch(
    async (req: Request, res: Response) => {
        const getGroups = await getGroupsService();
        res.status(200).json({
            data: [
                {
                    field: "grupos",
                    details: getGroups
                }
            ]
        });
    }
);