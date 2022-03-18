import { Model } from 'sequelize';
import Candidate from '../models/Candidate';

interface CandidateInfo extends Model<typeof Candidate> {
    id: number;
    name: string;
    surname: string;
    email: string;
    skype: string;
    phone: string;
    education: string;
    technology: string;
    cvName?: string;
}

export default CandidateInfo;
