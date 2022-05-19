import { Router } from 'express';
import eventsController from '../controllers/eventsController';

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
eventsRouter.get(
  '/response/:id',
  authorizationMiddleware,
  eventsController.getEventResponse,
);
eventsRouter.get(
  '/user/:id/response',
  authorizationMiddleware,
  eventsController.getUserEventsResponses,
);
eventsRouter.post('/add', authorizationMiddleware, eventsController.addEvent);
eventsRouter.put(
  '/response/:id',
  authorizationMiddleware,
  eventsController.addEventResponse,
);

export default eventsRouter;
