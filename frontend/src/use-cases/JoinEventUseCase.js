import { EventService } from "../services/EventService";
// This use case allows a user to join a specific event by calling the EventService.
// The static `execute` method takes the event ID and user ID as parameters,
// and delegates the action to the `joinEvent` method in EventService.
export class JoinEventUseCase{
  static async execute(eventId, userId) {
    return await EventService.joinEvent(eventId, userId);
  }
}
