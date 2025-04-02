import { EventService } from "../services/EventService";

export class LeaveEventUseCase{
  static async execute(eventId, userId) {
    return await EventService.leaveEvent(eventId, userId);
  }
}
