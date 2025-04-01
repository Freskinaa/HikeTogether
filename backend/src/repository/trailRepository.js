import TrailModel from "../models/Trail.js";

class TrailRepository {
  async findAll() {
    return await TrailModel.find();
  }

  async findById(id) {
    return await TrailModel.findById(id);
  }

  async create(trailData) {
    const trail = new TrailModel(trailData);
    return await trail.save();
  }

  async update(id, trailData) {
    return await TrailModel.findByIdAndUpdate(id, trailData, { new: true });
  }

  async deleteById(id) {
    return await TrailModel.findByIdAndDelete(id);
  }
}

export default new TrailRepository();
