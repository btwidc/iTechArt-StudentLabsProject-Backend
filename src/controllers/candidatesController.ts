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
        return next(
          ApiError.BadRequest('Validation error', errors.array()),
        );
      }

      const {
        name,
        surname,
        email,
        skype,
        phone,
        education,
        technology,
      } = req.body;

      const file = req.files.file;
      file.mv(`public/docs/CV(${email})`);

      const candidateInfo = await candidatesService.addCandidateInfo(
        name,
        surname,
        email,
        skype,
        phone,
        education,
        technology,
      );

      res.json(candidateInfo);
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
      const candidateId = req.params.id;
      const candidateInfo = await candidatesService.getCandidateInfo(candidateId);

      res.json(candidateInfo);
    } catch (e) {
      next(e);
    }
  }
}

const candidatesController = new CandidatesController();

export default candidatesController;
