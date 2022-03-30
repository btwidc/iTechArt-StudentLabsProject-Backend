import UserProfileDto from './UserProfileDto';
import CandidateDto from './CandidateDto';
import CategoryDto from './CategoryDto';
import EventResponseDto from './EventResponseDto';

class EventDto {
  public id: number;
  public date: string;
  public participant: UserProfileDto;
  public candidate: CandidateDto;
  public category: CategoryDto;
  public eventResponse: EventResponseDto;
  constructor(model) {
    this.id = model.id;
    this.date = model.date;
    this.participant = model.participant;
    this.candidate = model.candidate;
    this.category = model.category;
    this.eventResponse = model.eventResponse;
  }
}

export default EventDto;
