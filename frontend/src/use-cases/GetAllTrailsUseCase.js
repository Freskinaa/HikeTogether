import { TrailService } from '../services/TrailService';
// This use case is responsible for retrieving all trail records by calling the TrailService.
// The static `execute` method fetches and returns all trails using the `getAllTrails` method.
// It acts as an intermediary between the controller and the service layer, ensuring separation of concerns.
// The `execute` method is static, allowing it to be called without instantiating the class.
export class GetAllTrailsUseCase {
  static async execute() {
    return await TrailService.getAllTrails();
  }
}
