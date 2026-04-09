import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny, ZodIssue } from "zod";

const zodValidationMiddleware = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: err.issues.map((e: ZodIssue) => ({
            field: e.path.join("."),
            message: e.message
          }))
        });
      }

      next(err);
    }
  };

export default zodValidationMiddleware;