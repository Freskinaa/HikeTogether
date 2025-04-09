import { ApiClient } from '../api/ApiClient';

export class UserService {
  static async getAllUsers() {
    return await new ApiClient().get(`/users`);
  }
}
