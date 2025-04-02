import { AuthService } from '../services/AuthService';

export class GetUserByIdUseCase {
  static async execute(userId) {
    return await AuthService.getUserById(userId);
  }
}
