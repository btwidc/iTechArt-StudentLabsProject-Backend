import UserDto from '../dtos/UserDto';

interface RefreshResponse {
    newAccessToken: string;
    user: UserDto;
}

export default RefreshResponse;
