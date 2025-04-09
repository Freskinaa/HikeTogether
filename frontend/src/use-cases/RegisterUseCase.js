import { AuthService } from '../services/AuthService';
// This code defines a RegisterUseCase class that encapsulates user registration logic.
// It uses the AuthService to register a user by passing user data.
// The execute method is static, which means it can be called without creating an instance of RegisterUseCase.
// The method is asynchronous and awaits the result of the registerUser function before returning the result.

export class RegisterUseCase {
  static async execute(userData) {
    return await AuthService.registerUser(userData);
  }
}
