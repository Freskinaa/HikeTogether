import { EventService } from "../services/EventService";
// This use case handles the creation of a new event by utilizing the EventService.
// It provides a static `execute` method that takes event data as input,
// and delegates the creation process to the `createEvent` method in EventService.
export class CreateEventUseCase{
  static async execute(eventData) {
    return await EventService.createEvent(eventData);
  }
}
