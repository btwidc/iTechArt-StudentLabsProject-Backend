import UserProfileInfo from './UserProfileInfo';
import CandidateInfo from './CandidateInfo';
import CategoryInfo from './CategoryInfo';
import EventResponse from './EventResponse';

interface EventInfo {
  id: number;
  date: string;
  participant: UserProfileInfo;
  candidate: CandidateInfo;
  category: CategoryInfo;
  eventResponse: EventResponse;
}

export default EventInfo;
