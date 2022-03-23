import Candidate from '../models/Candidate';

class CandidateDto extends Candidate {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public skype: string;
  public phone: string;
  public education: string;
  public technology: string;
  public cvLink?: string;
  constructor(model) {
    super();
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
    this.email = model.email;
    this.skype = model.skype;
    this.phone = model.phone;
    this.education = model.education;
    this.technology = model.technology;
    this.cvLink = model?.cvLink;
  }
}

export default CandidateDto;
