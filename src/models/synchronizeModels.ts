import User from './User';
import Token from './Token';
import Profile from './Profile';

const synchronizeModels = async () => {
    await User.sync();
    await Token.sync();
    await Profile.sync();
};

export default synchronizeModels;
