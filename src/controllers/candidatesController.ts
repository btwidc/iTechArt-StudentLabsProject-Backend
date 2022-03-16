import candidatesService from '../services/candidatesService';

import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError';

import CandidateInfo from '../types/CandidateInfo';
import { NextFunction, Request, Response } from 'express';
import Candidate from '../models/Candidate';

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

            const cv = req?.files?.cv;
            if (!cv) {
                return next(ApiError.BadRequest('No file'));
            }

            const cvName = cv.name;
            const cvPath = `public/docs/${cvName}`;
            cv.mv(cvPath);

            const candidateInfo = await candidatesService.addCandidateInfo(
                name,
                surname,
                email,
                skype,
                phone,
                education,
                technology,
                cvName,
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
            const candidateId = req.params.id;
            const candidateInfo = await candidatesService.getCandidateInfo(
                candidateId,
            );

            res.json(candidateInfo);
        } catch (e) {
            next(e);
        }
    }

    public async downloadCandidateCV(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const candidateId = Number.parseInt(req.params.id);
            const candidate = await Candidate.findOne({
                where: { id: candidateId },
            });

            const cvName = candidate.cvName;
            const cvPath = `public/docs/${cvName}`;

            res.download(cvPath, cvName, function (err) {
                if (err) {
                    return next(ApiError.BadRequest('Download failed'));
                }
            });
        } catch (e) {
            next(e);
        }
    }
}

const candidatesController = new CandidatesController();

export default candidatesController;
