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
        const errors = err.issues.map((issue) => {
          
          return {
            errorCode: 400,
            message: issue.message || `${issue.path} error desconcido`,
            href: "",
          };
        });

        res.status(400).json({ errors });
      } else {
        res.status(500).json(err);
      }
    }
  };
