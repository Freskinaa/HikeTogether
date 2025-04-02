import { EventService } from "../services/EventService";

export class CreateEventUseCase{
  static async execute(eventData) {
    return await EventService.createEvent(eventData);
  }
}
