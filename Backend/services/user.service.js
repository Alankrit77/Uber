const userModel = require("../models/user.model");

class UserService {
  async createUser(firstname, lastname, email, password) {
    console.log("Creating user with data:", {
      firstname,
      lastname,
      email,
      password,
    });
    if (!firstname || !email || !password) {
      throw new Error("All fields are required");
    }
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    return user;
  }
}

module.exports = new UserService();
