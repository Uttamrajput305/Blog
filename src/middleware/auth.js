const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).send("Please provide an Authorization header...");
    }

    const token = authHeader.replace("Bearer ", ""); // Ensure token format
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    req.user = decoded.username; // Store user info in request
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = auth;
