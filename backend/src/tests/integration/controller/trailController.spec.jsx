import { describe, it, expect, vi } from "vitest";
import * as trailController from "../../../controllers/trailController.js";
import trailService from "../../../services/trailService.js";

vi.mock("../../../services/trailService.js");

describe("TrailController Integration Test (Mocked)", () => {
  it("should create a new trail", async () => {
    const mockReq = {
      body: {
        name: "Ura e Kadiut",
        location: "Gjirokastër",
        difficulty: "moderate",
        length: "12 km",
        elevationGain: 650,
        duration: 5,
        routeType: "Loop",
        description: "Pamje të mahnitshme të ures dhe lumenjve",
        photos: ["ura1.jpg", "ura2.jpg"],
      },
    };

    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const mockNext = vi.fn();

    trailService.createTrail = vi.fn().mockResolvedValue(mockReq.body);

    await trailController.createTrail(mockReq, mockRes, mockNext);

    expect(trailService.createTrail).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
  });

  it("should get all trails", async () => {
    const mockTrails = [
      {
        name: "Trail 1",
        location: "Location 1",
        difficulty: "easy",
        length: "5 km",
        photos: ["trail1.jpg"],
      },
      {
        name: "Trail 2",
        location: "Location 2",
        difficulty: "hard",
        length: "10 km",
        photos: ["trail2.jpg"],
      },
    ];

    const mockReq = {};
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const mockNext = vi.fn();

    trailService.getAllTrails = vi.fn().mockResolvedValue(mockTrails);

    await trailController.getAllTrails(mockReq, mockRes, mockNext);

    expect(trailService.getAllTrails).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTrails);
  });

  it("should get a trail by ID", async () => {
    const mockTrail = {
      name: "Trail 1",
      location: "Location 1",
      difficulty: "easy",
      length: "5 km",
      photos: ["trail1.jpg"],
    };

    const mockReq = { params: { id: "mockId" } };
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const mockNext = vi.fn();

    trailService.getTrailById = vi.fn().mockResolvedValue(mockTrail);

    await trailController.getTrailById(mockReq, mockRes, mockNext);

    expect(trailService.getTrailById).toHaveBeenCalledWith("mockId");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTrail);
  });

  it("should return 404 if trail not found", async () => {
    const mockReq = { params: { id: "mockId" } };
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const mockNext = vi.fn();

    trailService.getTrailById = vi.fn().mockResolvedValue(null);

    await trailController.getTrailById(mockReq, mockRes, mockNext);

    expect(trailService.getTrailById).toHaveBeenCalledWith("mockId");
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: "Trail not found" });
  });
});