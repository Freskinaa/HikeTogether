import { UserService } from '../services/UserService';

export class GetAllUsersUseCase {
  static async execute() {
    return await UserService.getAllUsers();
  }
}
