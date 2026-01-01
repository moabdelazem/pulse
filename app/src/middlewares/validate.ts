import { Request, Response, NextFunction } from "express";
import { z } from "zod/v4";

type ZodSchema = z.ZodType<unknown>;

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({
        error: {
          message: "Validation failed",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
      return;
    }
    
    req.body = result.data;
    next();
  };
};
