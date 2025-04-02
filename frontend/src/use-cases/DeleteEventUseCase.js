import { EventService } from "../services/EventService";

export class DeleteEventUseCase{
  static async execute(id) {
    return await EventService.deleteEvent(id);
  }
}
