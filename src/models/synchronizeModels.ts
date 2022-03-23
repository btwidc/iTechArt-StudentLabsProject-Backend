import User from './User';
import Token from './Token';
import Profile from './Profile';
import Candidate from './Candidate';

const synchronizeModels = async () => {
  await User.sync();
  await Token.sync();
  await Profile.sync();
  await Candidate.sync();
};

export default synchronizeModels;
