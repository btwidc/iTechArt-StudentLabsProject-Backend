import User from '../models/User';
import Profile from '../models/Profile';

import UserDto from '../dtos/UserDto';
import UserProfileDto from '../dtos/UserProfileDto';

import UserProfileInfo from '../types/UserProfileInfo';

import ApiError from '../errors/ApiError';

class ProfileService {
    public async addUserProfileInfo(
        name: string,
        surname: string,
        email: string,
        skype: string,
        ageExperience: number,
        department: string,
        summary: string,
    ): Promise<UserProfileInfo> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw ApiError.BadRequest(`User with email ${email} not exists`);
        }

        const userDto = new UserDto(user);
        const userId = userDto.id;

        const userProfileData = await Profile.create({
            name,
            surname,
            email,
            skype,
            ageExperience,
            department,
            summary,
            userId,
        });

        return new UserProfileDto(userProfileData);
    }

    public async getUserProfileInfo(userId: string): Promise<UserProfileInfo> {
        const userProfile = await Profile.findOne({ where: { userId } });

        if (!userProfile) {
            throw ApiError.BadRequest(`Can't get user profile`);
        }

        return new UserProfileDto(userProfile);
    }
}

export default new ProfileService();
