import { ApiClient } from '../api/ApiClient';
// This code defines an EventService class that provides methods to interact with the API for event-related operations.
// The methods include creating, updating, retrieving, deleting, and joining or leaving events using the ApiClient.
// Each method communicates with the API using different HTTP methods (POST, PUT, GET, DELETE) to perform the necessary actions.

export class EventService {
  static async createEvent(eventData) {
    return await new ApiClient().post('/events', eventData);
  }

  static async updateEvent(id, eventData) {
    return await new ApiClient().put(`/events/${id}`, eventData);
  }

  static async getEventById(id) {
    return await new ApiClient().get(`/events/${id}`);
  }

  static async getAllEvents() {
    return await new ApiClient().get('/events');
  }

  static async deleteEvent(id) {
    return await new ApiClient().delete(`/events/${id}`);
  }

  static async joinEvent(eventId,userId) {
    return await new ApiClient().post('/events/join', {eventId, userId});
  }

  static async leaveEvent(eventId,userId) {
    return await new ApiClient().post('/events/leave', {eventId, userId});
  }
}
