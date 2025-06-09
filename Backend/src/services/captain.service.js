const captainModel = require("../models/captain.model");

class CaptainService {
  createCaptain = async (
    firstname,
    lastname,
    email,
    password,
    location,
    color,
    plate,
    capacity,
    vehicleType,
    phone
  ) => {
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicleType ||
      !phone
    ) {
      throw new Error("All fields are required");
    }
    const captain = captainModel.create({
      fullname: {
        firstname,
        lastname,
      },
      phone,
      email,
      password,
      location,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });
    return captain;
  };
}

module.exports = new CaptainService();
