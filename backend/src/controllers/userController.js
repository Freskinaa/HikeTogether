import userService from "../services/userService.js";
import { HTTP_CODE } from "../enums/http-status-codes.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(HTTP_CODE.OK).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(HTTP_CODE.NotFound).json({ msg: "User not found" });
    }
    res.status(HTTP_CODE.OK).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
     await userService.createUser(req.body);
    res.status(HTTP_CODE.Created).json({msg: 'User created.'});
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(HTTP_CODE.NotFound).json({ msg: "User not found" });
    }
    res.status(HTTP_CODE.OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(HTTP_CODE.NotFound).json({ msg: "User not found" });
    }
    res.status(HTTP_CODE.OK).json({ msg: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken , user} = await userService.authenticateUser(email, password);
    res.status(HTTP_CODE.OK).json({ accessToken, refreshToken, user });
  } catch (err) {
    res.status(HTTP_CODE.BadRequest).json({ message: err.message  });
    // next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken, refreshToken: newRefreshToken } = await userService.refreshAccessToken(refreshToken);
    res.status(HTTP_CODE.OK).json({ accessToken, newRefreshToken });
  } catch (err) {
    next(err);
  }
};