import { ApiClient } from '../api/ApiClient';

export class EventService {
  static async createEvent(eventData) {
    return await new ApiClient().post('/events', eventData);
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
