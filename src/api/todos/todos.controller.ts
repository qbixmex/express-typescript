import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Todo, Todos, TodoWithId } from './todos.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ObjectId } from 'mongodb';

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

export async function getTodo(
  request: Request<ParamsWithId, TodoWithId, {}>,
  response: Response<TodoWithId>,
  next: NextFunction,
) {
  try {

    const id = request.params.id;
    const result = await Todos.findOne({ _id: new ObjectId(id) });

    if (!result) {
      response.status(404);
      throw new Error(`Todo with id "${id}" not found`);
    }

    response.status(200).json(result);

  } catch (error) {

    if (error instanceof ZodError) {
      response.status(422);
    }
    next(error);

  }
}

export async function updateTodo(
  request: Request<ParamsWithId, TodoWithId, Todo>,
  response: Response<TodoWithId>,
  next: NextFunction,
) {
  try {
    const id = request.params.id;
    const result = await Todos.findOneAndUpdate({
      _id: new ObjectId(id),
    }, {
      $set: request.body,
    }, {
      returnDocument: 'after',
    });
  
    if (!result.value) {
      response.status(404);
      throw new Error(`Todo with id "${id}" not found`);
    }

    response.status(200).json(result.value);

  } catch (error) {

    if (error instanceof ZodError) {
      response.status(422);
    }
    next(error);

  }
}
