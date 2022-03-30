import { Router } from 'express';
import eventsController from '../controllers/eventsController';

import { body } from 'express-validator';
import authorizationMiddleware from '../middleware/authorizationMiddleware';

const eventsRouter = Router();

eventsRouter.get(
  '/list',
  authorizationMiddleware,
  eventsController.getEventsList,
);
eventsRouter.get(
  '/info/:id',
  authorizationMiddleware,
  eventsController.getEvent,
);
eventsRouter.post('/add', authorizationMiddleware, eventsController.addEvent);

export default eventsRouter;
