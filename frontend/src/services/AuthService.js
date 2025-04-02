import { ApiClient } from '../api/ApiClient';

export class AuthService {
  static async registerUser(userData) {
    return await new ApiClient().post('/users', userData);
  }

  static async loginUser(credentials) {
    return await new ApiClient().post('/users/login', credentials);
  }

  static async getUserById(userId) {
    return await new ApiClient().get(`/users/${userId}`);
  }
}
