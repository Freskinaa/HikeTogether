import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
  refreshToken,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/login', authenticateUser);
router.post('/', createUser);
router.post('/refresh-token', refreshToken);

router.get('/', getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
