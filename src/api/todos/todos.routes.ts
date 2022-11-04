import { Router } from 'express';
import * as TodosController from './todos.controller';

const router = Router();

router.get('/', TodosController.getTodos);
router.post('/', TodosController.createTodo);

export default router;
