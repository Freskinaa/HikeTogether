import { EventService } from "../services/EventService";
// Use Case for retrieving a specific event by its ID
// This class handles the logic for fetching a single event by its ID through the EventService.
// It abstracts the interaction with the service layer to keep the code clean and maintainable.
// The `execute` method is static, allowing it to be called without instantiating the class
export class GetEventByIdUseCase{
  static async execute(id) {
    return await EventService.getEventById(id);
  }
}
