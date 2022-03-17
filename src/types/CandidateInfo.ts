interface CandidateInfo {
    id: number;
    name: string;
    surname: string;
    email: string;
    skype: string;
    phone: string;
    education: string;
    technology: string;
    cvName?: string;
    cv?: File;
}

export default CandidateInfo;
