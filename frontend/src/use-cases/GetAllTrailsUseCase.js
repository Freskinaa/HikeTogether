import { TrailService } from '../services/TrailService';

export class GetAllTrailsUseCase {
  static async execute() {
    return await TrailService.getAllTrails();
  }
}
