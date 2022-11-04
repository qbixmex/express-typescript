import { Router } from 'express';

import * as TodosController from './todos.controller';

const router = Router();

router.get('/', TodosController.getTodos);

export default router;
