import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent
} from "../controllers/eventContoller.js";

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/join', joinEvent);
router.post('/leave', leaveEvent);

export default router;
