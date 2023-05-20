import  { Express, Request, Response, NextFunction } from "express";
import { authRoutes } from "./auth";
import { usersRoutes } from "./users";
import { groupsRoutes } from "./groups";
import { reportsRoutes } from "./reports";
import { errorInterceptor, notFound } from "./middlewares";
import { summariesRoutes } from "./summaries";
import { reportError } from "./utils";

//rest apí routes
export function routes(app:Express) {

    // login
    app.use("/auth", authRoutes);
    app.use("/users", usersRoutes);
    app.use("/groups", groupsRoutes);
    app.use("/reports", reportsRoutes);
    app.use("/summaries", summariesRoutes);
    // get the current session
    app.use(errorInterceptor);
    app.use(notFound);
    // custom error handler
      app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
        reportError(err.message, err.name);
        return res.status(500).json({
          errorCode:500,
          message:err.message,
          href:""
        });
        next();
      });
  }


