import { Request, Response } from "express";
import jwt_decode from "jwt-decode";
import { tryCatch } from "../../utils";
import { getUserService } from "../../users";
import { updateTokenService } from "../services/auth.services";

//delete the tokens and the delete the current session
export const signOutController = tryCatch(

    async (req: Request, res: Response) => {
  
      const cookies = req.cookies;
      if (!cookies.jwt) {
        res
        .status(200).json({
            field:"autorizacion",
           details: "el usuario ha cerrado sesion"
          
        });
      }
      
      const tokenCookie = cookies.jwt;
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const refreshToken:any  = jwt_decode(tokenCookie);
  
      const foundOfficer = await getUserService({
        name:refreshToken.info.username
      });
      
      if(!foundOfficer){
        res.clearCookie("jwt");
        res
        .status(200).json({
          data:[
            {field:"autorizacion",
          details: "el usuario ha cerrado sesion"
          }
          ]
        });
      }
     
    
      const delToken = foundOfficer!.token.filter((token:string) => token !== tokenCookie);
      
      
  
      const updateTokens = await updateTokenService({
        data:{
          token:[...delToken]
        },
        where:{
          name:foundOfficer!.name
        }
      });
  
      res.clearCookie("jwt");
  
      res
        .status(200)
        .json({
          
              field: "formulario",
              details: `${foundOfficer?.name} ha salido de la sesion`,
          
      });
    }
  );
  