import { Response, Request, NextFunction } from 'express';
import { Todos, TodoWithId } from './todos.model';

export async function getTodos(_request: Request, response: Response<TodoWithId[]>, next: NextFunction) {
  try {
    const result = await Todos.find();
    const todos = await result.toArray();
    response.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}
