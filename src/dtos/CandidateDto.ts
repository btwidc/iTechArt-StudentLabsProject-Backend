class CandidateDto {
    public id: number;
    public name: string;
    public surname: string;
    public email: string;
    public skype: string;
    public phone: string;
    public education: string;
    public technology: string;
    public cvName?: string;
    public cv?: File;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.surname = model.surname;
        this.email = model.email;
        this.skype = model.skype;
        this.phone = model.phone;
        this.education = model.education;
        this.technology = model.technology;
        this.cvName = model?.cvName;
        this.cv = model?.cv;
    }
}

export default CandidateDto;
