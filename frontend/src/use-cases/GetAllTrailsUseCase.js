import { TrailService } from '../services/TrailService';
// This use case is responsible for retrieving all trail records by calling the TrailService.
// The static `execute` method fetches and returns all trails using the `getAllTrails` method.
export class GetAllTrailsUseCase {
  static async execute() {
    return await TrailService.getAllTrails();
  }
}
