class UserProfileDto {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public skype: string;
  public ageExperience: number;
  public department: string;
  public summary: string;
  public userId: number;
  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
    this.email = model.email;
    this.skype = model.skype;
    this.ageExperience = model.ageExperience;
    this.department = model.department;
    this.summary = model.summary;
    this.userId = model.userId;
  }
}

export default UserProfileDto;
