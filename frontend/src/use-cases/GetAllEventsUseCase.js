import { EventService } from "../services/EventService";

export class GetAllEventsUseCase{
  static async execute() {
    return await EventService.getAllEvents();
  }
}
