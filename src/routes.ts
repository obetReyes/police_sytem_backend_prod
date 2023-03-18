import  { Express, Request, Response, NextFunction } from "express";
import { authRoutes } from "./auth";
import { usersRoutes } from "./users";
import { groupsRoutes } from "./groups";
import { errorInterceptor, notFound } from "./middlewares";


//rest apí routes
export function routes(app:Express) {

    // login
    app.use("/auth", authRoutes);
    app.use("/users", usersRoutes);
    app.use("/groups", groupsRoutes);

    // get the current session
    app.use(errorInterceptor);
    app.use(notFound);
    // custom error handler
      app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
        next();
      });
  }


