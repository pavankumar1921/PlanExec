const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenForAuthorization = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Token invalid" });
      }
      req.user = decodedToken.user;
      next();
    });
  } catch (error) {
    console.error("Error in authenticateToken middleware:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = tokenForAuthorization;
