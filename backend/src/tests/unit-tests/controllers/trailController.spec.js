import * as trailController from '../../../controllers/trailController.js';
import trailService from '../../../services/trailService.js';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('TrailController', () => {
  const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  const mockReq = (data = {}) => data;

  beforeEach(() => {
    vi.restoreAllMocks(); 
  });

  it('getAllTrails - should return all trails', async () => {
    const trails = [{ id: 1, name: 'Trail One' }];
    vi.spyOn(trailService, 'getAllTrails').mockResolvedValue(trails);

    const req = mockReq();
    const res = mockRes();

    await trailController.getAllTrails(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(trails);
  });

  it('getTrailById - should return a trail if found', async () => {
    const trail = { id: 1, name: 'Trail One' };
    vi.spyOn(trailService, 'getTrailById').mockResolvedValue(trail);

    const req = mockReq({ params: { id: 1 } });
    const res = mockRes();

    await trailController.getTrailById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(trail);
  });

  it('getTrailById - should return 404 if trail not found', async () => {
    vi.spyOn(trailService, 'getTrailById').mockResolvedValue(null);

    const req = mockReq({ params: { id: 999 } });
    const res = mockRes();

    await trailController.getTrailById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Trail not found' });
  });

  it('createTrail - should create and return new trail', async () => {
    const trailData = { name: 'New Trail' };
    const createdTrail = { id: 2, name: 'New Trail' };
    vi.spyOn(trailService, 'createTrail').mockResolvedValue(createdTrail);

    const req = mockReq({ body: trailData });
    const res = mockRes();

    await trailController.createTrail(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdTrail);
  });

  it('updateTrail - should return updated trail if found', async () => {
    const updatedTrail = { id: 1, name: 'Updated Trail' };
    vi.spyOn(trailService, 'updateTrail').mockResolvedValue(updatedTrail);

    const req = mockReq({ params: { id: 1 }, body: { name: 'Updated Trail' } });
    const res = mockRes();

    await trailController.updateTrail(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTrail);
  });

  it('updateTrail - should return 404 if trail not found', async () => {
    vi.spyOn(trailService, 'updateTrail').mockResolvedValue(null);

    const req = mockReq({ params: { id: 999 }, body: {} });
    const res = mockRes();

    await trailController.updateTrail(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Trail not found' });
  });

  it('deleteTrail - should return success if trail is deleted', async () => {
    vi.spyOn(trailService, 'deleteTrail').mockResolvedValue(true);

    const req = mockReq({ params: { id: 1 } });
    const res = mockRes();

    await trailController.deleteTrail(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Trail deleted' });
  });

  it('deleteTrail - should return 404 if trail not found', async () => {
    vi.spyOn(trailService, 'deleteTrail').mockResolvedValue(null);

    const req = mockReq({ params: { id: 999 } });
    const res = mockRes();

    await trailController.deleteTrail(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Trail not found' });
  });
});
