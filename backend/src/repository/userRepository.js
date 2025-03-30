import UserModel from "../models/User.js";

class UserRepository {
  async findAll() {
    return await UserModel.find();
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteById(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
