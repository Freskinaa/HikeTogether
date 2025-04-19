import { describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import authMiddleware from '../../middleware/authMiddleware.js'; 
import config from '../../config.js';

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

describe('authMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: vi.fn(),
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it('should call next if token is valid', () => {
    const mockToken = 'validToken';
    const decodedUser = { id: 1, name: 'John Doe' };
    req.header.mockReturnValue(`Bearer ${mockToken}`);
    jwt.verify.mockReturnValue(decodedUser);

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, config.JWT_SECRET);
    expect(req.user).toEqual(decodedUser);
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', () => {
    req.header.mockReturnValue(undefined);

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    const mockToken = 'invalidToken';
    req.header.mockReturnValue(`Bearer ${mockToken}`);
    jwt.verify.mockImplementation(() => {
      throw new Error('Token is not valid');
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Token is not valid' });
    expect(next).not.toHaveBeenCalled();
  });
});
