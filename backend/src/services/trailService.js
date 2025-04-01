import trailRepository from "../repository/trailRepository.js";

class TrailService {
  async getAllTrails() {
    return await trailRepository.findAll();
  }

  async getTrailById(id) {
    return await trailRepository.findById(id);
  }

  async createTrail(trailData) {
    return await trailRepository.create(trailData);
  }

  async updateTrail(id, trailData) {
    return await trailRepository.update(id, trailData);
  }

  async deleteTrail(id) {
    return await trailRepository.deleteById(id);
  }
}

export default new TrailService();
