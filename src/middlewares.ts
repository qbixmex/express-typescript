import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import ErrorResponse from './interfaces/ErrorResponse';
import RequestValidators from './interfaces/RequestValidators';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>, next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function validateRequest(validators: RequestValidators) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        request.params = await validators.params.parseAsync(request.params);
      }
      if (validators.body) {
        request.body = await validators.body.parseAsync(request.body);
      }
      if (validators.query) {
        request.query = await validators.query.parseAsync(request.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) response.status(422);
      next(error);
    }
  };
}