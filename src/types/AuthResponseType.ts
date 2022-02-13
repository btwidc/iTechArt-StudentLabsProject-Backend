import UserDto from "../dtos/UserDto";

interface AuthResponseType {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export default AuthResponseType;
