import Candidate from '../models/Candidate';
import CandidateDto from '../dtos/CandidateDto';
import CandidateInfo from '../types/CandidateInfo';

import ApiError from '../errors/ApiError';
import fs from 'fs';

class CandidatesService {
    public async addCandidateInfo(
        name: string,
        surname: string,
        email: string,
        skype: string,
        phone: string,
        education: string,
        technology: string,
        cvName?: string,
        cv?: File,
    ): Promise<CandidateInfo> {
        const candidate = await Candidate.findOne({ where: { email } });

        if (candidate) {
            throw ApiError.BadRequest(
                `Candidate with email ${email} already exists`,
            );
        }

        if (cv) {
            const candidateData = await Candidate.create({
                name,
                surname,
                email,
                skype,
                phone,
                education,
                technology,
                cvName,
                cv,
            });
            return new CandidateDto(candidateData);
        } else {
            const candidateData = await Candidate.create({
                name,
                surname,
                email,
                skype,
                phone,
                education,
                technology,
            });
            return new CandidateDto(candidateData);
        }
    }

    public async getCandidatesList(): Promise<Array<CandidateInfo>> {
        const candidatesList = await Candidate.findAll();

        if (!candidatesList) {
            throw ApiError.BadRequest(`Can't get candidates list`);
        }

        return candidatesList;
    }

    public async getCandidateInfo(id: number): Promise<CandidateInfo> {
        const candidateInfo = await Candidate.findOne({ where: { id } });

        if (!candidateInfo) {
            throw ApiError.BadRequest(`Can't get candidate info`);
        }

        return new CandidateDto(candidateInfo);
    }

    public async deleteCandidate(id: number): Promise<number> {
        const candidateInfo = await this.getCandidateInfo(id);
        const deleteCandidateInfo = await Candidate.destroy({ where: { id } });
        if (!deleteCandidateInfo) {
            throw ApiError.BadRequest('Candidate does not exist');
        }

        if (candidateInfo.cv) {
            const cvName = candidateInfo.cvName;
            const cvPath = `public/docs/${cvName}`;
            fs.unlinkSync(cvPath);
        }
        return deleteCandidateInfo;
    }
}

export default new CandidatesService();
