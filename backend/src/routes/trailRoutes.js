import express from 'express';
import {
  getAllTrails,
  getTrailById,
  createTrail,
  updateTrail,
  deleteTrail
} from "../controllers/trailController.js";

const router = express.Router();

router.get('/', getAllTrails);
router.get('/:id', getTrailById);
router.post('/', createTrail);
router.put('/:id', updateTrail);
router.delete('/:id', deleteTrail);

export default router;
