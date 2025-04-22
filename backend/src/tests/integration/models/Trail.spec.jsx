// import mongoose from "mongoose";
// import { describe, it, beforeAll, afterAll, afterEach, expect } from "vitest";
// import TrailModel from "../../../models/Trail.js";

// describe("TrailModel Integration Test", () => {
//   // Increase timeout for the beforeAll hook
//   beforeAll(async () => {
//     // Connect to the test database
//     await mongoose.connect("mongodb://127.0.0.1:27017/hikeTogetherTest", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   }, 20000); // Timeout set to 20 seconds

//   // Increase timeout for the afterAll hook
//   afterAll(async () => {
//     // Disconnect from the database
//     await mongoose.disconnect();
//   }, 20000); // Timeout set to 20 seconds

//   // Clear the Trail collection after each test
//   afterEach(async () => {
//     await TrailModel.deleteMany({});
//   });

//   it("should create a valid trail", async () => {
//     const validTrail = {
//       name: "Bear Mountain",
//       location: "USA",
//       difficulty: "moderate",
//       length: "6 km",
//       elevationGain: 500,
//       duration: 3,
//       routeType: "Loop",
//       status: true,
//       description: "Beautiful trail through the woods.",
//       photos: ["trail.jpg"],
//       keyFeatures: ["Scenic views", "Wildlife"],
//       tags: ["hiking", "nature"],
//     };

//     const trail = await TrailModel.create(validTrail);

//     expect(trail._id).toBeDefined();
//     expect(trail.name).toBe(validTrail.name);
//     expect(trail.location).toBe(validTrail.location);
//     expect(trail.difficulty).toBe(validTrail.difficulty);
//     expect(trail.length).toBe(validTrail.length);
//     expect(trail.elevationGain).toBe(validTrail.elevationGain);
//     expect(trail.duration).toBe(validTrail.duration);
//     expect(trail.routeType).toBe(validTrail.routeType);
//     expect(trail.status).toBe(validTrail.status);
//     expect(trail.description).toBe(validTrail.description);
//     expect(trail.photos).toEqual(validTrail.photos);
//     expect(trail.keyFeatures).toEqual(validTrail.keyFeatures);
//     expect(trail.tags).toEqual(validTrail.tags);
//   });

//   it("should fail to create a trail without a required field", async () => {
//     const invalidTrail = {
//       location: "USA",
//       difficulty: "moderate",
//       length: "6 km",
//       photos: ["trail.jpg"],
//     };

//     await expect(TrailModel.create(invalidTrail)).rejects.toThrow();
//   });

//   it("should reference events in the events field", async () => {
//     const mockEventId = new mongoose.Types.ObjectId();
//     const trailWithEvent = {
//       name: "Bear Mountain",
//       location: "USA",
//       difficulty: "moderate",
//       length: "6 km",
//       photos: ["trail.jpg"],
//       events: [mockEventId],
//     };

//     const trail = await TrailModel.create(trailWithEvent);

//     expect(trail.events).toContainEqual(mockEventId);
//   });
// });
