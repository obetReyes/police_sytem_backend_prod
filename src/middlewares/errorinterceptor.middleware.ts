import { Response, Request, NextFunction } from "express";
import { CustomError } from "../utils";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";


export const errorInterceptor = async(error:Error, req:Request, res:Response,next:NextFunction ) => {
    
    
    if(error instanceof CustomError){
        return res.status(error.statusCode ?? 400).json({
            errors:[
                {
                field:error.campo,
                error:error.message || "error desconocido",
                href:error.href
                }
            ]
        });
    }
    
    if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === "P2002") {
            return res.status(409).json({
                errors:[
                    {
                    field:"autorizacion",
                    details:"las credenciales ya estan tomadas",
                    href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409"
                }
                ]
            });
        }

        if(error.code === "P2025"){
            return res.status(404).json({
                errors:[
                    {
                        field:"registros",
                        details:"los datos no fueron encontrados",
                        href:""
                    }
                ]
            });
        }
    }

    if(error instanceof jwt.JsonWebTokenError){
        return res.status(401).json({
            errors:[
                {
                    field:"autorizacion",
                    details:"el token  de autorizacion es invalido, la firma es invalida.",
                    href:""
                }
            ]
        });
    }
    if(error instanceof SyntaxError || error instanceof TypeError){ 
        return res.status(400).json({
            errors:[
                {field:error.name, error:error.message, href:"https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Errors/Unexpected_token"}]
        });
    }

};

