import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { getGroupService } from "../services/groups.service";
import { CustomError } from "../../utils";
import { redis } from "../../utils";

export const getGroupController = tryCatch(
  async (req: Request, res: Response) => {
    const { group } = req.params;
    const cachedReport = await redis.get(`group:${group}`);
    if (cachedReport) {
      const response = {
        message: JSON.parse(cachedReport),
      };
      return res.status(200).json(response);
    }
    const getGroup = await getGroupService({
      name: group,
    });

    if (getGroup == undefined) {
      throw new CustomError("el grupo no existe", "", 404);
    }else{

    
    const users = getGroup.users.map((user) => {
      return {
        name: user.name,
        location: user.location,
        reports: user._count.reports,
      };
    });

const response = {
      messsage:{ 
        id: getGroup.id,
        name:getGroup.name,
        area: getGroup.area,
        createdAt: getGroup.createdAt,
        updatedAt:getGroup.updatedAt,
        users:users
      }
      
    };
    // Store report data in cache for future requests
    await redis.set(`group:${group}`, JSON.stringify(getGroup), "EX", 300); //cached for 5 minutes
  
    


    return res.status(200).json(response);
  }
}
);
