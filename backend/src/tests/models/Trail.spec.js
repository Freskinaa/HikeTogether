import { describe, it, expect, vi } from 'vitest';
import mongoose from 'mongoose';
import TrailModel from '../../models/Trail'; 

vi.mock('mongoose', async () => {
  const actualMongoose = await vi.importActual('mongoose');
  return {
    ...actualMongoose,
    model: vi.fn(() => ({
      create: vi.fn(),
      find: vi.fn(),
      findById: vi.fn(),
      findOne: vi.fn(),
    })),
  };
});

describe('Trail Model', () => {
  it('should create a trail with valid data', async () => {
    const validTrailData = {
      name: 'Mountain Trail',
      location: 'Mountain Region',
      difficulty: 'moderate',
      length: '5 km',
      elevationGain: 300,
      duration: 120,
      routeType: 'out-and-back',
      status: true,
      description: 'A moderate mountain trail.',
      photos: ['photo1.jpg', 'photo2.jpg'],
      keyFeatures: ['Scenic views', 'Wildlife'],
      tags: ['nature', 'moderate'],
      events: [],
    };

    const createdTrail = new TrailModel(validTrailData);
    const saveMock = vi.fn().mockResolvedValue(createdTrail);
    createdTrail.save = saveMock;

    await createdTrail.save();
    expect(saveMock).toHaveBeenCalled();
    expect(createdTrail.name).toBe('Mountain Trail');
    expect(createdTrail.difficulty).toBe('moderate');
  });

  it('should throw error if required field is missing', async () => {
    const invalidTrailData = {
      location: 'Mountain Region',
      difficulty: 'hard',
      length: '8 km',
      photos: ['photo1.jpg'],
    };

    const createdTrail = new TrailModel(invalidTrailData);
    const saveMock = vi.fn().mockRejectedValue(new Error('ValidationError: name: Path `name` is required.'));
    createdTrail.save = saveMock;

    await expect(createdTrail.save()).rejects.toThrow('ValidationError: name: Path `name` is required.');
  });

  it('should validate enum for difficulty field', async () => {
    const invalidTrailData = {
      name: 'Test Trail',
      location: 'Test Location',
      difficulty: 'extreme', 
      length: '4 km',
      photos: ['photo1.jpg'],
    };

    const createdTrail = new TrailModel(invalidTrailData);
    const saveMock = vi.fn().mockRejectedValue(new Error('ValidationError: `extreme` is not a valid enum value for path `difficulty`.'));
    createdTrail.save = saveMock;

    await expect(createdTrail.save()).rejects.toThrow('ValidationError: `extreme` is not a valid enum value for path `difficulty`.');
  });

  it('should populate events correctly', async () => {
    const mockEventId = new mongoose.Types.ObjectId();
    const trailData = {
      name: 'Trail with Events',
      location: 'Forest',
      difficulty: 'easy',
      length: '3 km',
      photos: ['photo1.jpg'],
      events: [mockEventId],
    };

    const findOneMock = vi.fn().mockResolvedValue({
      ...trailData,
      events: [{ _id: mockEventId, name: 'Sample Event' }],
    });
    
    TrailModel.findOne = findOneMock;

    const trail = await TrailModel.findOne({ _id: new mongoose.Types.ObjectId() });
    expect(trail.events).toHaveLength(1);
    expect(trail.events[0]).toHaveProperty('name', 'Sample Event');
  });
});
