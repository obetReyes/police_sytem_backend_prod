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
          field: issue.path[1],
          error:
            issue.message == "Required"
              ? "el campo es requerido"
              : issue.message,
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
