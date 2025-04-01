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

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.get('/:id', authMiddleware, updateUser);
router.get('/:id', authMiddleware, deleteUser);

export default router;
