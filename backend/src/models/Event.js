import mongoose from "mongoose";
import TrailModel from "./Trail.js";
import UserModel from "./User.js";


// Defines the Event schema and model.
// - Stores data about events, including title, date, trail, creator, attendees, and status.
// - Automatically sets default values and pulls related trail and user info when a new event is created.


const Event = new mongoose.Schema({
  trail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trail",
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  attendees: [
    {
      _id: String,
      firstName: String,
      lastName: String,
    }
  ],
  location: {
    type: String,
  },
  duration: {
    type: Number,
  },
  maxAttendees: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "completed"],
    default: "active",
  },
});

Event.pre("save", async function (next) {
  if (this.isNew) {
    const trail = await TrailModel.findById(this.trail);
    const user = await UserModel.findById(this.creator._id);

    if (trail) {
      this.duration = trail.duration;
      this.location = trail.location;
    }

    this.status = "active";
    this.maxAttendees = 10;

    this.attendees.push({
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  }
  
  next();
});

const EventModel = mongoose.model("Event", Event);

export default EventModel;
