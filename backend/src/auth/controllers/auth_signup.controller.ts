import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import bcrypt from "bcrypt";
import { CustomError } from "../../utils";
import { createUserService } from "../../users";
import { getGroupService } from "../../groups";

export const signUpOfficerController = tryCatch(
    async (req: Request, res: Response) => {
      const { username, password, cuip, group} = req.body;
      const pwdToStore = await bcrypt.hash(password, 10);
      


      const isGroup = await getGroupService({
       name:group
      });
   
      if(!isGroup){
          throw new CustomError("el grupo al cual el oficial se trata de asignar no existe", "400");
      }
     

      if(isGroup){
      const signUpOfficer = await createUserService({
        name: username,
        password: pwdToStore,
        role:"OFFICER",
        cuip:cuip,
        group:{
          connect:{
            name:group
          }
        }
      });
    
      res
        .status(201)
        .json({
            message: `nuevo oficial creado ${signUpOfficer.name}`,
        });
      }
  
    }
  );
  


export const signUpDispatcherController = tryCatch(
    async (req: Request, res: Response) => {
      const { username, password, cuip} = req.body;
      const pwdToStore = await bcrypt.hash(password, 10);
      const signUpOfficer = await createUserService({
        name: username,
        password: pwdToStore,
        role:"DISPATCHER",
        cuip:cuip
      });
      res
        .status(201)
        .json({
          
            message: `nuevo operador de emergencia  creado ${signUpOfficer.name}`,
      
        });
    }
  );
  //signup controller is used to register an user in the app, it does not generate the jwt and is not mean to be used in the app also to implement this action we need to use Linux Iptables block,it blocks incoming access to selected or specific ip address
  
  export const signUpSuperiorController  =tryCatch(
    async (req: Request, res: Response) => {
      const { username, cuip,password} = req.body;
      const pwdToStore = await bcrypt.hash(password, 10);
      const signUpOfficer = await createUserService({
        name: username,
        password: pwdToStore,
        role:"OPERATOR",
        cuip:cuip
      });
      res
        .status(201)
        .json({
              message: `nuevo operador central creado ${signUpOfficer.name}`,
            },
            
          );
    }
  );