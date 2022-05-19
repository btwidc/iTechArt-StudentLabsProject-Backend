import eventsService from '../services/eventsService';

import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError';

import { NextFunction, Request, Response } from 'express';
import EventInfo from '../types/EventInfo';
import EventResponse from '../types/EventResponse';

class EventsController {
  public async getEventsList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<EventInfo[] | void> {
    try {
      const events = await eventsService.getEvents();

      res.json(events);
    } catch (e) {
      next(e);
    }
  }

  public async getEvent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<EventInfo | void> {
    try {
      const eventId = Number.parseInt(req.params.id);
      const event = await eventsService.getEvent(eventId);

      res.json(event);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  public async addEvent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<EventInfo | void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { date, participantFullName, candidateFullName, categoryName } =
        req.body;

      const participant = await eventsService.getParticipant(
        participantFullName,
      );
      const candidate = await eventsService.getCandidate(candidateFullName);
      const category = await eventsService.getCategory(categoryName);

      const event = await eventsService.addEvent(
        date,
        participant,
        candidate,
        category,
      );

      res.json(event);
    } catch (e) {
      next(e);
    }
  }

  public async getEventResponse(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<EventResponse | void> {
    try {
      const eventId = Number.parseInt(req.params.id);
      const eventResponse = await eventsService.getEventResponse(eventId);

      res.json(eventResponse);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  public async getUserEventsResponses(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<EventResponse[] | void> {
    try {
      const userId = Number.parseInt(req.params.id);
      const eventResponses = await eventsService.getUserEventsResponses(userId);

      res.json(eventResponses);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  public async addEventResponse(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<EventResponse | void> {
    try {
      const eventId = Number.parseInt(req.params.id);
      const { responseContent } = req.body;

      const eventResponse = await eventsService.addEventResponse(
        eventId,
        responseContent,
      );

      res.json(eventResponse);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

const eventsController = new EventsController();

export default eventsController;
