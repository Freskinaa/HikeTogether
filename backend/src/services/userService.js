import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import userRepository from '../repository/userRepository.js';

class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    return await userRepository.findById(id);
  }

  async createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    return await userRepository.create(newUser);
  }

  async updateUser(id, userData) {
    return await userRepository.update(id, userData);
  }

  async deleteUser(id) {
    return await userRepository.deleteById(id);
  }

  async authenticateUser(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRATION,
    });

    const refreshToken = jwt.sign({ id: user.id, email: user.email }, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRATION,
    });

    return { accessToken, refreshToken, user };
  }

  async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
      const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, config.JWT_SECRET, {
        expiresIn: config.JWT_ACCESS_EXPIRATION,
      });

      return { accessToken };
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }
}

export default new UserService();
