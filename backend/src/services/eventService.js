import eventRepository from "../repository/eventRepository.js";

class EventService {
  async createEvent(eventData) {
    return await eventRepository.createEvent(eventData);
  }

  async updateEvent(id, eventData) {
    return await eventRepository.updateEvent(id, eventData);
  }

  async deleteEvent(id) {
    return await eventRepository.deleteEvent(id);
  }

  async getAllEvents() {
    return await eventRepository.getAllEvents();
  }

  async getEventById(id) {
    return await eventRepository.getEventById(id);
  }

  async joinEvent(eventId, userId) {
    return await eventRepository.joinEvent(eventId, userId);
  }

  async leaveEvent(eventId, userId) {
    return await eventRepository.leaveEvent(eventId, userId);
  }
}

export default new EventService();
