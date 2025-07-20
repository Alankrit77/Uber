const crypto = require("crypto");

const getOtp = (num) => {
  if (!Number.isInteger(num) || num < 1 || num > 10) {
    throw new Error("OTP length must be an integer between 1 and 10");
  }

  const min = 0;
  const max = Math.pow(10, num) - 1;

  const otp = crypto
    .randomInt(min, max + 1)
    .toString()
    .padStart(num, "0");
  return otp;
};

module.exports = {
  getOtp,
  crypto,
};
