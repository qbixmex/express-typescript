import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Todo, Todos, TodoWithId } from './todos.model';

export async function getTodos(
  _request: Request,
  response: Response<TodoWithId[]>,
  next: NextFunction,
) {
  try {
    const result = await Todos.find();
    const todos = await result.toArray();
    response.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}

export async function createTodo(
  request: Request<{}, TodoWithId, Todo>,
  response: Response<TodoWithId>,
  next: NextFunction,
) {
  try {
    const result = await Todos.insertOne(request.body);

    if (!result.acknowledged) {
      throw new Error('Error inserting todo');
    }

    response.status(201).json({
      _id: result.insertedId,
      ...request.body,
    });

  } catch (error) {
    if (error instanceof ZodError) {
      response.status(422);
    }
    next(error);
  }
}