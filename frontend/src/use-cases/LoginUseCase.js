import { AuthService } from '../services/AuthService';

export class LoginUseCase {
  static async execute(credentials) {
    return await AuthService.loginUser(credentials);
  }
}
