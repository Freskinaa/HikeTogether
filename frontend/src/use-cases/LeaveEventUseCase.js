import { EventService } from "../services/EventService";
// This use case handles the action of a user leaving an event by calling the EventService.
// The static `execute` method takes the event ID and user ID as input,
export class LeaveEventUseCase{
  static async execute(eventId, userId) {
    return await EventService.leaveEvent(eventId, userId);
  }
}
