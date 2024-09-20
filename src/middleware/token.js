const jwt = require("jsonwebtoken");

const generateAuthToken = (username) => {
  try {
    return jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateAuthToken
};
