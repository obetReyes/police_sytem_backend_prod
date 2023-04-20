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
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
          errorCode:400,
          message:
            issue.message 
              ? `${issue.path} ${issue.message}`
              : "el campo es requerido",
          href: "",
        }));
        const formattedErrRes: Array<object> = [];
        errors.forEach((value) => {
          formattedErrRes.push(value);
        });

        res.status(400).json({ errors: formattedErrRes });
      } else {
        res.status(500).json(err);
      }
    }
  };
