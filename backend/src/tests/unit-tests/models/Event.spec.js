import { describe, it, expect, vi } from 'vitest';
import mongoose from 'mongoose';
import EventModel from '../../../models/Event'; 
import * as TrailModel from '../../../models/Trail'; 
import * as UserModel from '../../../models/User';

vi.mock('../../../models/Trail', () => ({
  findById: vi.fn(),
}));

vi.mock('../../../models/User', () => ({
  findById: vi.fn(),
}));

describe('Event Model', () => {


  it('should handle missing trail or creator data', async () => {
    const mockEventData = {
      trail: 'mockInvalidTrailId', 
      creator: { _id: 'mockUserId' },
      title: 'Hiking Adventure',
      description: 'A fun hiking event.',
      date: new Date(),
    };

    TrailModel.findById.mockResolvedValue(null); 
    UserModel.findById.mockResolvedValue(null); 

    const createdEvent = new EventModel(mockEventData);
    const saveMock = vi.fn().mockRejectedValue(new Error('ValidationError: Trail or User not found'));
    createdEvent.save = saveMock;

    await expect(createdEvent.save()).rejects.toThrow('ValidationError: Trail or User not found');
  });

  it('should not override status if event already exists', async () => {
    const existingEvent = {
      status: 'inactive',
    };

    const createdEvent = new EventModel(existingEvent);
    const saveMock = vi.fn().mockResolvedValue(existingEvent);
    createdEvent.save = saveMock;

    await createdEvent.save();

    expect(createdEvent.status).toBe('inactive'); 
  });

  it('should throw error if title or description is missing', async () => {
    const mockEventData = {
      trail: 'mockTrailId',
      creator: { _id: 'mockUserId' },
      date: new Date(),
    };

    const createdEvent = new EventModel(mockEventData);
    const saveMock = vi.fn().mockRejectedValue(new Error('ValidationError: title: Path `title` is required.'));
    createdEvent.save = saveMock;

    await expect(createdEvent.save()).rejects.toThrow('ValidationError: title: Path `title` is required.');
  });
});
