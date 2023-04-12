import {Request, Response, NextFunction} from "express";

//this middelware check if the route does not exists
export const notFound = (req:Request, res:Response, next:NextFunction) => {
    res.status(404).json({
            errorCode:400,
            error:"error la ruta no existe dentro de la api",
            href:"https://developer.mozilla.org/es/docs/Web/HTTP/Status/404#:~:text=The%20HTTP%20404%20Not%20Found,absence%20is%20temporary%20or%20permanent."
            }
    );
    next();
};