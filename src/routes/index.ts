import { Router } from 'express';
import usersRouter from './usersRouter';
import candidatesRouter from './candidatesRouter';
import categoriesRouter from './categoriesRoutes';

const router = Router();

router.use('/user', usersRouter);
router.use('/candidate', candidatesRouter);
router.use('/category', categoriesRouter);

export default router;
