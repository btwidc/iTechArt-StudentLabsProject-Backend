import { Router } from 'express';
import usersRouter from './candidatesRouter';
import candidatesRouter from './candidatesRouter';

const router = Router();

router.use('/user', usersRouter);
router.use('/candidate', candidatesRouter);

export default router;
