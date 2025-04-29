import mongoose from "mongoose";
import UserModel from "../../../models/User.js";

describe("User Model Integration Test", () => {
  beforeAll(async () => {
    // Connect to your existing MongoDB instance
    const uri = "mongodb://127.0.0.1:27017/hikeTogetherTest"; // Replace with your test database URI
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Disconnect from the database
    await mongoose.disconnect();
  });

  afterEach(async () => {
    // Clear the User collection after each test
    await UserModel.deleteMany({});
  });

  it("should create a valid user", async () => {
    const validUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      age: 30,
      gender: "male",
      location: "New York",
    };

    const user = await UserModel.create(validUser);

    expect(user._id).toBeDefined();
    expect(user.firstName).toBe(validUser.firstName);
    expect(user.lastName).toBe(validUser.lastName);
    expect(user.email).toBe(validUser.email);
    expect(user.password).toBe(validUser.password);
    expect(user.age).toBe(validUser.age);
    expect(user.gender).toBe(validUser.gender);
    expect(user.location).toBe(validUser.location);
  });

  it("should fail to create a user with an invalid email", async () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      password: "password123",
    };

    await expect(UserModel.create(invalidUser)).rejects.toThrow("Invalid email address");
  });

  it("should fail to create a user with a short password", async () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "123",
    };

    await expect(UserModel.create(invalidUser)).rejects.toThrow(
      "Password must be at least 6 characters long"
    );
  });

  it("should fail to create a user with an age less than 1", async () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      age: 0,
    };

    await expect(UserModel.create(invalidUser)).rejects.toThrow(
      "Age cannot be less than 1"
    );
  });

  it("should fail to create a user with an invalid gender", async () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      gender: "invalid-gender",
    };

    await expect(UserModel.create(invalidUser)).rejects.toThrow(
      '`gender` is invalid'
    );
  });

  it("should reference events in the eventsAttending field", async () => {
    const mockEventId = new mongoose.Types.ObjectId();
    const userWithEvent = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "password123",
      eventsAttending: [mockEventId],
    };

    const user = await UserModel.create(userWithEvent);

    expect(user.eventsAttending).toContainEqual(mockEventId);
  });
});