import { AuthService } from '../services/AuthService';

export class RegisterUseCase {
  static async execute(userData) {
    return await AuthService.registerUser(userData);
  }
}
