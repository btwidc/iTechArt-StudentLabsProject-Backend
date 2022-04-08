import User from './User';
import Token from './Token';
import Profile from './Profile';
import Candidate from './Candidate';
import Category from './Category';
import EventResponse from './EventResponse';
import Event from './Event';

const synchronizeModels = async () => {
  await User.sync();
  await Token.sync();
  await Profile.sync();
  await Candidate.sync();
  await Category.sync();
  await EventResponse.sync();
  await Event.sync();
};

export default synchronizeModels;
