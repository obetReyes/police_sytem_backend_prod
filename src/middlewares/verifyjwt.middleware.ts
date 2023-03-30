import {Request,Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface customReq  extends Request{
    user?:string
    role?:string
}

export const verifyJwt = (req:customReq, res:Response, next:NextFunction) => {
    const JwtToken = req.cookies["jwt"];
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader ) {
        console.log("jwt",JwtToken);
        return res.status(403).json({errors:[
            {"campo":"headers", "error":"el token de autorizacion es requerido", "href":""}]});  
    }
    const token = (authHeader as string).split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err: any, decoded:any) => {
            if (err || !JwtToken) {
                console.log(err);
                console.log("jwt",JwtToken);
                return res.status(403).json({errors:[
                    {field:"authorization", error:"el token de autorizacion es invalido o ah expirado", href:""}]});            
            } 
        
            //invalid token
            req.user = decoded.info.username;
            req.role = decoded.info.role;
            next();
        }
    );
}
;
