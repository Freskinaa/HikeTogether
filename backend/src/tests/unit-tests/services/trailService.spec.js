import { describe, it, expect, vi } from 'vitest';
import TrailService from '../../../services/trailService';
import * as trailRepository from '../../../repository/trailRepository';

vi.mock('../../../repository/trailRepository', () => ({
  __esModule: true, 
  default: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteById: vi.fn(),
  },
}));

describe('TrailService', () => {
  afterEach(() => {
    vi.clearAllMocks(); 
  });

  it('should get all trails', async () => {
    const trails = [{ id: 1, name: 'Trail 1' }, { id: 2, name: 'Trail 2' }];
    trailRepository.default.findAll.mockResolvedValue(trails);

    const result = await TrailService.getAllTrails();

    expect(result).toEqual(trails);
    expect(trailRepository.default.findAll).toHaveBeenCalledOnce();
  });

  it('should get a trail by id', async () => {
    const trail = { id: 1, name: 'Trail 1' };
    trailRepository.default.findById.mockResolvedValue(trail);
  
    const result = await TrailService.getTrailById(1);
  
    expect(result).toEqual(trail);
    expect(trailRepository.default.findById).toHaveBeenCalledWith(1);
  });
  

  it('should create a new trail', async () => {
    const newTrail = { name: 'New Trail' };
    const createdTrail = { id: 1, ...newTrail };
    trailRepository.default.create.mockResolvedValue(createdTrail);

    const result = await TrailService.createTrail(newTrail);

    expect(result).toEqual(createdTrail);
    expect(trailRepository.default.create).toHaveBeenCalledWith(newTrail);
  });

  it('should update a trail', async () => {
    const updatedTrailData = { name: 'Updated Trail' };
    const updatedTrail = { id: 1, ...updatedTrailData };
    trailRepository.default.update.mockResolvedValue(updatedTrail);

    const result = await TrailService.updateTrail(1, updatedTrailData);

    expect(result).toEqual(updatedTrail);
    expect(trailRepository.default.update).toHaveBeenCalledWith(1, updatedTrailData);
  });

  it('should delete a trail', async () => {
    const trailId = 1;
    trailRepository.default.deleteById.mockResolvedValue(true);

    const result = await TrailService.deleteTrail(trailId);

    expect(result).toBe(true);
    expect(trailRepository.default.deleteById).toHaveBeenCalledWith(trailId);
  });
});
