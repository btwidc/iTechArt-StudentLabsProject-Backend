class EventResponseDto {
  id: number;
  responseContent: string | null;
  userId: number;
  constructor(model) {
    this.id = model.id;
    this.responseContent = model.responseContent;
    this.userId = model.userId;
  }
}

export default EventResponseDto;
