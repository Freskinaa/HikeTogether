import { EventService } from "../services/EventService";

export class GetEventByIdUseCase{
  static async execute(id) {
    return await EventService.getEventById(id);
  }
}
