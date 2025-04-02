import { EventService } from "../services/EventService";

export class JoinEventUseCase{
  static async execute(eventId, userId) {
    return await EventService.joinEvent(eventId, userId);
  }
}
