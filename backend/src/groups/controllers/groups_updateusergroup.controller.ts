import { tryCatch } from "../../utils";
import { Request, Response } from "express";
import { CustomError } from "../../utils";
import { getUserService, updateUserService } from "../../users";

interface customReq extends Request {
    user?: string
    role?: string
}

export const updateUserGroupController = tryCatch(
    async (req: customReq, res: Response) => {

        const { name, username } = req.body;
        const getUser = await getUserService({
            name: username
        });
        console.log("rol:", getUser);
        if (getUser?.role !== "OFFICER") {
            throw new CustomError("el agnete no tiene asignado ningun grupo", "", 400);
        }

        if(getUser.name == null){
            throw new CustomError("el agente no existe", "", 400);
        }
        if (getUser.groupName == name) {
            throw new CustomError("el agente ya tiene asignado este grupo", "", 400);
        }

        const updateGroup = await updateUserService({
            data: {
                group: {
                    update: {
                        name: name
                    }
                }
            },
            where: {
                name: username
            }
        });

        res.status(200).json({
                    message: updateGroup
               });
    }
);