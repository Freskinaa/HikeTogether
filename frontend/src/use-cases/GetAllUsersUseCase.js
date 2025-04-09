import { UserService } from '../services/UserService';
// Use Case for retrieving all users
// This class encapsulates the logic for fetching all users from the UserService.
// It serves as an intermediary between the controller and the service layer.
// The `execute` method is static, allowing it to be called without instantiating the class.
// It uses the UserService to fetch all users from the database or API.
export class GetAllUsersUseCase {
  static async execute() {
    return await UserService.getAllUsers();
  }
}
