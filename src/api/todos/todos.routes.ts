import { Router } from 'express';
import { Todo } from './todos.model';
import * as TodosController from './todos.controller';
import { validateRequest } from '../../middlewares';

const router = Router();

router.get('/', TodosController.getTodos);
router.post('/', validateRequest({ body: Todo }), TodosController.createTodo);

export default router;
