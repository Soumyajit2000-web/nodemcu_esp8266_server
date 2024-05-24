import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function validationMiddleware<T>(type: any): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(type, req.body);
    const errors = await validate(instance, { skipMissingProperties: false });
    
    if (errors.length > 0) {
      const errorMessages = errors.map((error: ValidationError) =>
        Object.values(error.constraints || {}).join(', ')
      );
      res.status(400).json({ errors: errorMessages });
    } else {
      next();
    }
  };
}
