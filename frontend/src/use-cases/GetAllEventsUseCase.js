import { EventService } from "../services/EventService";
// Use Case for retrieving all events
// This class is responsible for handling the logic of fetching all events
// It acts as an intermediary between the controller and the service layer.
// The `execute` method is static, allowing it to be called without instantiating the class.
// It uses the EventService to fetch all events from the database or API.
export class GetAllEventsUseCase{
  static async execute() {
    return await EventService.getAllEvents();
  }
}
