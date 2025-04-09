import { ApiClient } from '../api/ApiClient';
// This code defines an AuthService class that interacts with the API for user-related authentication operations.
// The methods include registering a user, logging in a user, and fetching a user by their ID using the ApiClient.
// Each method uses ApiClient's post or get methods to send requests to the backend API and return the response.

export class AuthService {
    // Method to register a new user by sending a POST request to the '/users' endpoint with the user data.

  static async registerUser(userData) {
    return await new ApiClient().post('/users', userData);
  }
  // Method to log in a user by sending a POST request to the '/users/login' endpoint with login credentials.

  static async loginUser(credentials) {
    return await new ApiClient().post('/users/login', credentials);
  }
  // Method to fetch user data by ID by sending a GET request to the '/users/{userId}' endpoint.

  static async getUserById(userId) {
    return await new ApiClient().get(`/users/${userId}`);
  }
}
