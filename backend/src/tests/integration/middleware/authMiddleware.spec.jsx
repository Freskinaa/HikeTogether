import jwt from "jsonwebtoken";
import authMiddleware from "../../../middleware/authMiddleware.js";

// Mock the config module
vi.mock("../../../config.js", () => ({
  default: {
    JWT_SECRET: "mock-secret-key",
  },
}));

vi.mock("jsonwebtoken");

describe("authMiddleware Unit Test", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: vi.fn(),
    };
    res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should return 401 if no token is provided", () => {
    req.header.mockReturnValue(null);

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: "No token, authorization denied" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if the token is invalid", () => {
    req.header.mockReturnValue("Bearer invalidtoken");
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: "Token is not valid" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next and attach user to req if the token is valid", () => {
    const mockUser = { id: "123", name: "John Doe" };
    req.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockReturnValue(mockUser);

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("validtoken", "mock-secret-key");
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});