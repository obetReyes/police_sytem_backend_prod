import { Request,Response } from "express";
import { tryCatch } from "../../utils";
import { getAllUsersService } from "../services/users.service";


export const getUsersController = tryCatch(
    async (req: Request, res: Response) => {
        const users = await getAllUsersService();
        return res.status(200).json({
          data: [
            {
              campo: "usuarios",
              details: users
            }
          ]
        });
      }
);