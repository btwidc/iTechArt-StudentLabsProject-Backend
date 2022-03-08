import Candidate from '../models/Candidate';
import CandidateDto from '../dtos/CandidateDto';
import CandidateInfo from '../types/CandidateInfo';

import ApiError from '../errors/ApiError';

class CandidatesService {
  public async addCandidateInfo(
    name: string,
    surname: string,
    email: string,
    skype: string,
    phone: string,
    education: string,
    technology: string,
  ): Promise<CandidateInfo> {
    const candidate = await Candidate.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(
        `Candidate with email ${email} already exists`,
      );
    }

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

  public async getCandidateInfo(id: string): Promise<CandidateInfo> {
    const candidateInfo = await Candidate.findOne({ where: { id } });

    if (!candidateInfo) {
      throw ApiError.BadRequest(`Can't get candidate info`);
    }

    return new CandidateDto(candidateInfo);
  }
}

export default new CandidatesService();
