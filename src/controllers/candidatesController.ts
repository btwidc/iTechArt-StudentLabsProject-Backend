import candidatesService from '../services/candidatesService';

import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError';

import CandidateInfo from '../types/CandidateInfo';
import { NextFunction, Request, Response } from 'express';

class CandidatesController {
  public async addCandidateInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<CandidateInfo | void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { name, surname, email, skype, phone, education, technology } =
        req.body;

      const cv = req?.files?.cv;

      const candidateInfo = await candidatesService.addCandidate(
        name,
        surname,
        email,
        skype,
        phone,
        education,
        technology,
        cv,
      );

      res.json(candidateInfo);
    } catch (e) {
      next(e);
    }
  }

  public async getCandidatesList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Array<CandidateInfo> | void> {
    try {
      const candidatesList = await candidatesService.getCandidatesList();

      res.json(candidatesList);
    } catch (e) {
      next(e);
    }
  }

  public async getCandidateInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<CandidateInfo | void> {
    try {
      const candidateId = Number.parseInt(req.params.id);
      const candidateInfo = await candidatesService.getCandidateInfo(
        candidateId,
      );

      res.json(candidateInfo);
    } catch (e) {
      next(e);
    }
  }

  public async deleteCandidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const candidateId = Number.parseInt(req.params.id);
      const deleteCandidateInfo = await candidatesService.deleteCandidate(
        candidateId,
      );

      res.json(deleteCandidateInfo);
    } catch (e) {
      next(e);
    }
  }
}

const candidatesController = new CandidatesController();

export default candidatesController;
