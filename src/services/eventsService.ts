import Event from '../models/Event';
import EventDto from '../dtos/EventDto';
import EventInfo from '../types/EventInfo';

import User from '../models/User';
import Profile from '../models/Profile';
import Candidate from '../models/Candidate';
import Category from '../models/Category';
import EventResponse from '../models/EventResponse';

import UserProfileDto from '../dtos/UserProfileDto';
import CandidateDto from '../dtos/CandidateDto';
import CategoryDto from '../dtos/CategoryDto';

import ApiError from '../errors/ApiError';

class EventsService {
  public async getEvents(): Promise<EventInfo[]> {
    const events = await Event.findAll({
      attributes: ['id', 'date'],
      include: [
        {
          model: Profile,
          required: true,
          include: [
            { model: User, attributes: ['id', 'role'], required: true },
          ],
        },
        { model: Candidate, required: true },
        { model: Category, required: true },
        { model: EventResponse, required: true },
      ],
    });

    if (!events) {
      throw ApiError.BadRequest(`Can't get events`);
    }

    return events;
  }

  public async getEvent(eventID): Promise<EventInfo> {
    const event = await Event.findOne({
      where: eventID,
      attributes: ['id', 'date'],
      include: [
        {
          model: Profile,
          required: true,
          include: [
            { model: User, attributes: ['id', 'role'], required: true },
          ],
        },
        { model: Candidate, required: true },
        { model: Category, required: true },
        { model: EventResponse, required: true },
      ],
    });

    if (!event) {
      throw ApiError.BadRequest(`Can't get event`);
    }

    return event;
  }

  public async addEvent(
    date: string,
    participant: UserProfileDto,
    candidate: CandidateDto,
    category: CategoryDto,
  ): Promise<EventInfo> {
    const profile = await Profile.findOne({ where: { id: participant.id } });
    if (!profile) {
      throw ApiError.BadRequest(`Can't get profile`);
    }
    const profileId = profile.id;

    const user = await User.findOne({ where: { id: participant.userId } });
    if (!user) {
      throw ApiError.BadRequest(`Can't get user`);
    }
    const userId = user.id;

    const eventResponse = await EventResponse.create({
      userId: userId,
    });
    if (!eventResponse) {
      throw ApiError.BadRequest(`Can't get event response`);
    }
    const eventResponseId = eventResponse.id;

    const candidateId = candidate.id;
    const categoryId = category.id;

    const event = await Event.create({
      date,
      eventResponseId,
      profileId,
      candidateId,
      categoryId,
    });
    const eventDto = new EventDto(event);
    const eventId = eventDto.id;

    return this.getEvent(eventId);
  }

  public async getParticipant(
    participantFullName: string,
  ): Promise<UserProfileDto> {
    const participantEmail = participantFullName.split('(')[1].slice(0, -1);
    const participant = await Profile.findOne({
      where: { email: participantEmail },
    });

    if (!participant) {
      throw ApiError.BadRequest(`Can't get participant`);
    }

    return new UserProfileDto(participant);
  }

  public async getCandidate(candidateFullName: string): Promise<CandidateDto> {
    const candidateEmail = candidateFullName.split('(')[1].slice(0, -1);
    const candidate = await Candidate.findOne({
      where: { email: candidateEmail },
    });

    if (!candidate) {
      throw ApiError.BadRequest(`Can't get candidate`);
    }

    return new CandidateDto(candidate);
  }

  public async getCategory(categoryName: string): Promise<CategoryDto> {
    const category = await Category.findOne({ where: { name: categoryName } });

    if (!category) {
      throw ApiError.BadRequest(`Can't get category`);
    }

    return new CategoryDto(category);
  }
}

export default new EventsService();
