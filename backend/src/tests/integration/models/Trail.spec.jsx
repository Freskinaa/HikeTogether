import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, beforeAll, afterAll, afterEach, expect } from "vitest";
import TrailModel from "../../../models/Trail.js";

describe("TrailModel Integration Test", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri()); // Removed deprecated options
    console.log(" U lidh me MongoDB Memory Server");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log(" U shkëput nga MongoDB");
  });

  afterEach(async () => {
    await TrailModel.deleteMany({});
  });

  it("duhet të krijojë një trail të vlefshëm", async () => {
    const trailData = {
      name: "Ura e Kadiut",
      location: "Gjirokastër",
      difficulty: "moderate", // Using valid enum value
      length: "12 km",
      elevationGain: 650,
      duration: 5,
      routeType: "Loop",
      description: "Pamje të mahnitshme të ures dhe lumenjve",
      photos: ["ura1.jpg", "ura2.jpg"],
    };

    const trail = await TrailModel.create(trailData);

    expect(trail._id).toBeDefined();
    expect(trail.name).toBe(trailData.name);
    expect(trail.difficulty).toBe(trailData.difficulty);
  });

  it("duhet të dështojë kur mungon fusha e detyrueshme 'name'", async () => {
    const invalidTrail = {
      location: "Berat",
      difficulty: "easy",
      length: "5 km",
    };

    await expect(TrailModel.create(invalidTrail)).rejects.toThrow();
  });

  it("duhet të mbajë referenca të eventeve", async () => {
    const eventId = new mongoose.Types.ObjectId();
    const trail = await TrailModel.create({
      name: "Trail me Event",
      location: "Vlorë",
      difficulty: "hard", // Changed from "difficult" to "hard" to match enum
      length: "15 km",
      events: [eventId],
    });

    expect(trail.events).toHaveLength(1);
    expect(trail.events[0].toString()).toBe(eventId.toString());
  });
});