import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { getGroupsService } from "../services/groups.service";

export const getGroupsController = tryCatch(
    async (req: Request, res: Response) => {
        const getGroups = await getGroupsService();
        

        const response = getGroups.map(group => {
            return {
              id: group.id,
              area: group.area,
              name: group.name,
              createdAt: group.createdAt,
              users: group._count.users
            };
          });
          
        res.status(200).json(
                {
                    message: response
                }
        );
    }
);