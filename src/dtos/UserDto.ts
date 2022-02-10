class UserDto {
  public email: string;
  public id: number;
  public role: string;
  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.role = model.role;
  }
}

export default UserDto;
