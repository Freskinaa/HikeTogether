import { EventService } from "../services/EventService";

export class UpdateEventUseCase{
  static async execute(id, eventData) {
    return await EventService.updateEvent(id, eventData);
  }
}
