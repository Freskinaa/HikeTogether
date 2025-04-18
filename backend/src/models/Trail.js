import mongoose from 'mongoose';

const Trail = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    difficulty: { 
        type: String, 
        enum: ['easy', 'moderate', 'hard'],
        required: true 
    },
    length: { 
        type: String, 
        required: true 
    },
    elevationGain: { 
        type: Number 
    },
    duration: { 
        type: Number 
    },
    routeType: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    description: { 
        type: String 
    },
    photos: {
        type: [String],
        required: true,
    },
    keyFeatures: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

const TrailModel = mongoose.model("Trail", Trail);

export default TrailModel;