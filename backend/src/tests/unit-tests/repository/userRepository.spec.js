import { describe, it, expect, beforeEach, vi } from 'vitest';
import UserRepository from '../../../repository/userRepository';
import * as UserModelModule from '../../../models/User'; 

vi.mock('../../models/User', () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    findOne: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));
const UserModel = UserModelModule.default;

describe('UserRepository', () => {
  const mockUser = {
    _id: '123',
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find all users', async () => {
    UserModel.find.mockResolvedValue([mockUser]);

    const users = await UserRepository.findAll();
    expect(users).toEqual([mockUser]);
    expect(UserModel.find).toHaveBeenCalled();
  });

  it('should find a user by ID', async () => {
    UserModel.findById.mockResolvedValue(mockUser);

    const user = await UserRepository.findById('123');
    expect(user).toEqual(mockUser);
    expect(UserModel.findById).toHaveBeenCalledWith('123');
  });

  it('should find a user by email', async () => {
    UserModel.findOne.mockResolvedValue(mockUser);

    const user = await UserRepository.findByEmail('test@example.com');
    expect(user).toEqual(mockUser);
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should update a user by ID', async () => {
    const updatedUser = { ...mockUser, name: 'Updated' };
    UserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

    const result = await UserRepository.update('123', { name: 'Updated' });
    expect(result).toEqual(updatedUser);
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated' }, { new: true });
  });

  it('should delete a user by ID', async () => {
    UserModel.findByIdAndDelete.mockResolvedValue(mockUser);

    const result = await UserRepository.deleteById('123');
    expect(result).toEqual(mockUser);
    expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith('123');
  });
});
