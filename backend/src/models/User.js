import mongoose from 'mongoose';

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /\S+@\S+\.\S+/.test(email);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => {
        return password.length >= 6;
      },
      message: 'Password must be at least 6 characters long',
    },
  },
  description: {
    type: String,
    default: null
  },
  age: {
    type: Number,
    min: [1, 'Age cannot be less than 1'],
    max: [100, 'Age cannot be greater than 100'],
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: null
  },
  location: {
    type: String,
    default: null
  },
  phoneNumber: {
    type: String,
    default: null
  },
  socialMedia: {
    facebook: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    },
  },
  eventsAttending: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  created_at: {
    type: Date,
    default: Date.now,
  }
});

const UserModel = mongoose.model('User', User);

export default UserModel;