import { EventService } from "../services/EventService";
// This use case handles the deletion of an event by calling the EventService.
// It provides a single static method `execute` which receives the ID of the event to delete.
// Internally, it delegates the operation to the `deleteEvent` method in EventService.
export class DeleteEventUseCase{
  static async execute(id) {
    return await EventService.deleteEvent(id);
  }
}
