const cloudinary = require('cloudinary').v2;

import Candidate from '../models/Candidate';
import CandidateDto from '../dtos/CandidateDto';
import CandidateInfo from '../types/CandidateInfo';

import ApiError from '../errors/ApiError';

class CandidatesService {
  public async addCandidate(
    name: string,
    surname: string,
    email: string,
    skype: string,
    phone: string,
    education: string,
    technology: string,
    cv?: File,
  ): Promise<CandidateDto> {
    const candidate = await this.addCandidateInfo(
      name,
      surname,
      email,
      skype,
      phone,
      education,
      technology,
    );

    if (cv) {
      const candidateFullName = `${candidate.id}_${name}_${surname}`;
      const cvName = `${candidateFullName}_${cv.name}`;

      await cloudinary.uploader
        .upload_stream(
          { resource_type: 'auto', public_id: cvName },
          (error, result) => {
            if (error) {
              throw ApiError.BadRequest('Error during upload cv');
            } else {
              candidate.cvLink = result.secure_url;
              candidate.save();
            }
          },
        )
        .end(cv.data);

      return new CandidateDto(candidate);
    } else {
      return new CandidateDto(candidate);
    }
  }

  public async addCandidateInfo(
    name: string,
    surname: string,
    email: string,
    skype: string,
    phone: string,
    education: string,
    technology: string,
  ): Promise<CandidateDto> {
    const candidate = await Candidate.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(`Candidate with email ${email} already exists`);
    }

    return await Candidate.create({
      name,
      surname,
      email,
      skype,
      phone,
      education,
      technology,
    });
  }

  public async getCandidatesList(): Promise<Array<CandidateInfo>> {
    const candidates = await Candidate.findAll();

    if (!candidates) {
      throw ApiError.BadRequest(`Can't get candidates list`);
    }

    return candidates;
  }

  public async getCandidateInfo(id: number): Promise<CandidateDto> {
    const candidate = await Candidate.findOne({ where: { id } });

    if (!candidate) {
      throw ApiError.BadRequest(`Can't get candidate info`);
    }

    return new CandidateDto(candidate);
  }

  public async deleteCandidate(id: number): Promise<number> {
    const candidate = await this.getCandidateInfo(id);

    const deleteCandidateInfo = await Candidate.destroy({ where: { id } });
    if (!deleteCandidateInfo) {
      throw ApiError.BadRequest('Candidate does not exist');
    }

    const cvLink = candidate.cvLink;
    const cvName = cvLink.split('/')[7];

    await cloudinary.uploader.destroy(
      cvName,
      { resource_type: 'raw' },
      (error) => {
        if (error) {
          throw ApiError.BadRequest('Error during destroy cv');
        }
      },
    );

    return deleteCandidateInfo;
  }
}

export default new CandidatesService();
