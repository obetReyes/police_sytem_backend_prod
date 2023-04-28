import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
export const validator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      console.log(err);
      if (err instanceof ZodError) {
        const issuesMsg = err.issues.map((issue) => issue.message);
       const response = {
          errorCode:400,
          message:issuesMsg,
          href:""
        };

        res.status(400).json(response);
      } else {
        res.status(500).json(err);
      }
    }
  };
