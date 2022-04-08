import { Router } from 'express';
import usersRouter from './usersRouter';
import candidatesRouter from './candidatesRouter';
import categoriesRouter from './categoriesRoutes';
import eventsRouter from './eventsRouter';

const router = Router();

router.use('/user', usersRouter);
router.use('/candidate', candidatesRouter);
router.use('/category', categoriesRouter);
router.use('/event', eventsRouter);

export default router;
