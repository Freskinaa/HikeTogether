import eventService from "../services/eventService.js";
// Controller functions for handling event-related HTTP requests.
// Uses eventService to interact with the database and sends responses.
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const deletedEvent = await eventService.deleteEvent(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json({ msg: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const joinEvent = async (req, res, next) => {
  try {
    const { eventId, userId } = req.body;
    const updatedEvent = await eventService.joinEvent(eventId, userId);
    if (!updatedEvent) {
      return res.status(404).json({ msg: "Event or User not found" });
    }
    res.status(200).json({ message: "User joined the event successfully", event: updatedEvent });
  } catch (err) {
    next(err);
  }
};

export const leaveEvent = async (req, res, next) => {
  try {
    const { eventId, userId } = req.body;
    const updatedEvent = await eventService.leaveEvent(eventId, userId);
    if (!updatedEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json({ message: "User left the event successfully", event: updatedEvent });
  } catch (err) {
    next(err);
  }
};
