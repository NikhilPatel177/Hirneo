import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateSchema = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Please provide data' });
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join(''),
        message: e.message,
      }));
      return res.status(400).json({ message: 'Validation Error', errors });
    }

    req.validatedData = result.data;
    next();
  };
};
