import EventModel from "../models/Event.js";
import UserModel from "../models/User.js";
import TrailModel from "../models/Trail.js";

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
    return await EventModel.findByIdAndDelete(id);
  }

  async getAllEvents() {
    return await EventModel.find().populate("trail").populate("creator");
  }

  async getEventById(id) {
    return await EventModel.findById(id).populate("trail").populate("creator");
  }

  async joinEvent(eventId, userId) {
    const event = await EventModel.findById(eventId);
    const user = await UserModel.findById(userId);
    
    if (!event || !user) return null;
    
    if (event.attendees.some(att => att._id.toString() === userId)) {
      throw new Error("User already joined the event");
    }

    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      throw new Error("Event is full");
    }
    
    event.attendees.push({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    const eventIdObject = new mongoose.Types.ObjectId(eventId);
    
    await event.save();
    user.eventsAttending.push(eventIdObject);
    user.save();
    
    return event;
  }

  async leaveEvent(eventId, userId) {
    const event = await EventModel.findById(eventId);
    if (!event) return null;

    event.attendees = event.attendees.filter(att => att._id.toString() !== userId);
    await event.save();
    
    return event;
  }
}

export default new EventRepository();
