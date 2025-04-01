import { ApiClient } from '../api/ApiClient';

export class AuthService {
  static async registerUser(userData) {
    return await new ApiClient().post('/register', userData);
  }

  static async loginUser(credentials) {
    return await new ApiClient().post('/login', credentials);
  }

  static async getUserById(userId) {
    return await new ApiClient().get(`/user/${userId}`);
  }
}
