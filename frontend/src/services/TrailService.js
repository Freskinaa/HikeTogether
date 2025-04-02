import { ApiClient } from '../api/ApiClient';

export class TrailService {
  static async getAllTrails() {
    return await new ApiClient().get('/trails');
  }
}
