const userModel = require("../models/user.model");

class UserService {
  async createUser(firstname, lastname, email, password, phone) {
    if (!firstname || !email || !password || !phone) {
      throw new Error("All fields are required");
    }
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      phone,
      password,
    });
    return user;
  }
}

module.exports = new UserService();
