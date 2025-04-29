import { describe, it, expect, vi } from 'vitest';
import eventService from '../../../services/eventService';  
import * as eventRepository from '../../../repository/eventRepository';

vi.mock('../../../repository/eventRepository', () => ({
  default: {
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn(),
    getAllEvents: vi.fn(),
    getEventById: vi.fn(),
    joinEvent: vi.fn(),
    leaveEvent: vi.fn(),
  },
}));

describe('EventService', () => {
  it('should create a new event', async () => {
    const eventData = { name: 'Test Event' };
    const createEventMock = eventRepository.default.createEvent;

    createEventMock.mockResolvedValueOnce({ id: 1, ...eventData });

    const result = await eventService.createEvent(eventData);

    expect(createEventMock).toHaveBeenCalledWith(eventData);
    expect(result).toEqual({ id: 1, ...eventData });
  });

  it('should update an event', async () => {
    const eventId = 1;
    const updatedData = { name: 'Updated Event' };
    const updateEventMock = eventRepository.default.updateEvent;

    updateEventMock.mockResolvedValueOnce({ id: eventId, ...updatedData });

    const result = await eventService.updateEvent(eventId, updatedData);

    expect(updateEventMock).toHaveBeenCalledWith(eventId, updatedData);
    expect(result).toEqual({ id: eventId, ...updatedData });
  });

  it('should delete an event', async () => {
    const eventId = 1;
    const deleteEventMock = eventRepository.default.deleteEvent;

    deleteEventMock.mockResolvedValueOnce({ success: true });

    const result = await eventService.deleteEvent(eventId);

    expect(deleteEventMock).toHaveBeenCalledWith(eventId);
    expect(result).toEqual({ success: true });
  });

  it('should get all events', async () => {
    const getAllEventsMock = eventRepository.default.getAllEvents;

    getAllEventsMock.mockResolvedValueOnce([{ id: 1, name: 'Test Event' }]);

    const result = await eventService.getAllEvents();

    expect(getAllEventsMock).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1, name: 'Test Event' }]);
  });

  it('should get an event by id', async () => {
    const eventId = 1;
    const getEventByIdMock = eventRepository.default.getEventById;

    getEventByIdMock.mockResolvedValueOnce({ id: eventId, name: 'Test Event' });

    const result = await eventService.getEventById(eventId);

    expect(getEventByIdMock).toHaveBeenCalledWith(eventId);
    expect(result).toEqual({ id: eventId, name: 'Test Event' });
  });

  it('should join an event', async () => {
    const eventId = 1;
    const userId = 2;
    const joinEventMock = eventRepository.default.joinEvent;

    joinEventMock.mockResolvedValueOnce({ success: true });

    const result = await eventService.joinEvent(eventId, userId);

    expect(joinEventMock).toHaveBeenCalledWith(eventId, userId);
    expect(result).toEqual({ success: true });
  });

  it('should leave an event', async () => {
    const eventId = 1;
    const userId = 2;
    const leaveEventMock = eventRepository.default.leaveEvent;

    leaveEventMock.mockResolvedValueOnce({ success: true });

    const result = await eventService.leaveEvent(eventId, userId);

    expect(leaveEventMock).toHaveBeenCalledWith(eventId, userId);
    expect(result).toEqual({ success: true });
  });
});
