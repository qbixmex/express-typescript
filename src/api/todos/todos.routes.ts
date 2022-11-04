import { Router, Response, Request } from 'express';
import { Todos, TodoWithId } from './todos.model';

const router = Router();

router.get('/', async (_req: Request, res: Response<TodoWithId[]>) => {
  const result = await Todos.find();
  const todos = await result.toArray();
  res.status(200).json(todos);
});

//? Alternative
//? router.get<{}, Todo[]>('/', (_req, res) => {
//?   res.status(200).json([{
//?     content: 'Go to the Gym',
//?     done: false,
//?   }]);
//? });

export default router;