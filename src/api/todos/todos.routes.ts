import { Router } from 'express';
import { Todo } from './todos.model';
import * as TodosController from './todos.controller';
import { validateRequest } from '../../middlewares';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/', TodosController.getTodos);

router.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  TodosController.getTodo,
);

router.post(
  '/',
  validateRequest({ body: Todo }),
  TodosController.createTodo,
);

export default router;
