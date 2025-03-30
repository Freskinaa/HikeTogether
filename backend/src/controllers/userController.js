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
    const newUser = await userService.createUser(req.body);
    res.status(HTTP_CODE.Created).json(newUser);
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