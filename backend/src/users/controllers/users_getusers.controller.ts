import { Request,Response } from "express";
import { tryCatch } from "../../utils";
import { getAllUsersService } from "../services/users.service";


interface UsersResI{
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  role: string
  reports?: number
  summaries?: number
}
export const getUsersController = tryCatch(
    async (req: Request, res: Response) => {
        const getUsers = await getAllUsersService();
        
        const response = getUsers.map(user => {
          const getUsersFilteredData: UsersResI = {
            id:user.id,
            name:user.name,
            role:user.role,
            updatedAt:user.updatedAt,
            createdAt:user.createdAt
          };

          if(user.role == "OFFICER"){
            getUsersFilteredData.reports =  user._count.reports;
          }
          if(user.role == "DISPATCHER"){
            getUsersFilteredData.summaries =  user._count.summaries;
            
          }
          return getUsersFilteredData;
        });
        return res.status(200).json({
              message:response
            }
          );
      }
);