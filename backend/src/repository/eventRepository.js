import mongoose from "mongoose";
import EventModel from "../models/Event.js";
import UserModel from "../models/User.js";
import TrailModel from "../models/Trail.js";
// EventRepository handles operations related to events, including:
// - Creating, updating, and deleting events
// - Joining and leaving events for users
// - Retrieving events with status updates based on attendees and date

class EventRepository {
  async createEvent(eventData) {
    const event = new EventModel(eventData);
    const savedEvent = await event.save();

    await TrailModel.findByIdAndUpdate(event.trail, {
      $push: { events: savedEvent._id }
    });

    await UserModel.findByIdAndUpdate(event.creator, {
      $push: { eventsAttending: savedEvent._id }
    });

    return savedEvent;
  }

  async updateEvent(id, eventData) {
    return await EventModel.findByIdAndUpdate(id, eventData, { new: true });
  }

  async deleteEvent(id) {
    const event = await EventModel.findByIdAndDelete(id);
  
    if (!event) {
      throw new Error('Event not found');
    }
  
    await TrailModel.findByIdAndUpdate(event.trail, {
      $pull: { events: id }
    });
  
    await UserModel.updateMany(
      { eventsAttending: id },
      { $pull: { eventsAttending: id } }
    );
  
    return event;
  }  

  async getAllEvents() {
    const events = await EventModel.find()
      .select('-__v')
      .populate('trail')
      .populate('creator', '_id firstName lastName');

    const now = new Date();

    for (const event of events) {
      if (event.date < now && event.status !== 'completed') {
        event.status = 'completed';
        await event.save();
      } else if (event.attendees.length >= event.maxAttendees && event.status !== 'inactive') {
        event.status = 'inactive';
        await event.save();
      } else if (event.date >= now && event.attendees.length < event.maxAttendees && event.status !== 'active') {
        event.status = 'active';
        await event.save();
      }
    }

    return events.filter(e => e.status === 'active' && e.date >= now);
  }

  async getEventById(id) {
    const event = await EventModel.findById(id)
      .select('-__v')
      .populate('trail')
      .populate('creator', '_id firstName lastName');

    if (!event) return null;

    const now = new Date();

    if (event.date < now && event.status !== 'completed') {
      event.status = 'completed';
      await event.save();
    } else if (event.attendees.length >= event.maxAttendees && event.status !== 'inactive') {
      event.status = 'inactive';
      await event.save();
    } else if (event.date >= now && event.attendees.length < event.maxAttendees && event.status !== 'active') {
      event.status = 'active';
      await event.save();
    }

    return event;
  }

  async joinEvent(eventId, userId) {
    const event = await EventModel.findById(eventId);
    const user = await UserModel.findById(userId);

    if (!event || !user) return null;

    if (event.attendees.some(att => att._id.toString() === userId)) {
      throw new Error("User already joined the event");
    }

    if (event.attendees.length >= event.maxAttendees) {
      throw new Error("Event is full");
    }

    event.attendees.push({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await event.save();

    user.eventsAttending.push(new mongoose.Types.ObjectId(eventId));
    await user.save();

    if (event.attendees.length >= event.maxAttendees) {
      event.status = 'inactive';
      await event.save();
    }

    return event;
  }

  async leaveEvent(eventId, userId) {
    const event = await EventModel.findById(eventId);
    const user = await UserModel.findById(userId);

    if (!event || !user) return null;

    event.attendees = event.attendees.filter(att => att._id.toString() !== userId);
    await event.save();

    user.eventsAttending = user.eventsAttending.filter(id => id.toString() !== eventId);
    await user.save();

    if (event.attendees.length < event.maxAttendees && event.status === 'inactive') {
      event.status = 'active';
      await event.save();
    }

    return event;
  }
}

export default new EventRepository();
