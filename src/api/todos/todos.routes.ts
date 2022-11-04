import { Router, Response, Request } from 'express';
import Todo from './todos.model';

const router = Router();

router.get('/', (_req: Request, res: Response<Todo[]>) => {
  res.status(200).json([
    { content: 'Go to the Gym', done: false },
  ]);
});

//? Alternative
//? router.get<{}, Todo[]>('/', (_req, res) => {
//?   res.status(200).json([{
//?     content: 'Go to the Gym',
//?     done: false,
//?   }]);
//? });

export default router;