import trailService from "../services/trailService.js";

export const getAllTrails = async (req, res, next) => {
  try {
    const trails = await trailService.getAllTrails();
    res.status(200).json(trails);
  } catch (err) {
    next(err);
  }
};

export const getTrailById = async (req, res, next) => {
  try {
    const trail = await trailService.getTrailById(req.params.id);
    if (!trail) {
      return res.status(404).json({ msg: "Trail not found" });
    }
    res.status(200).json(trail);
  } catch (err) {
    next(err);
  }
};

export const createTrail = async (req, res, next) => {
  try {
    const newTrail = await trailService.createTrail(req.body);
    res.status(201).json(newTrail);
  } catch (err) {
    next(err);
  }
};

export const updateTrail = async (req, res, next) => {
  try {
    const updatedTrail = await trailService.updateTrail(req.params.id, req.body);
    if (!updatedTrail) {
      return res.status(404).json({ msg: "Trail not found" });
    }
    res.status(200).json(updatedTrail);
  } catch (err) {
    next(err);
  }
};

export const deleteTrail = async (req, res, next) => {
  try {
    const deletedTrail = await trailService.deleteTrail(req.params.id);
    if (!deletedTrail) {
      return res.status(404).json({ msg: "Trail not found" });
    }
    res.status(200).json({ msg: "Trail deleted" });
  } catch (err) {
    next(err);
  }
};
