const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    {
      issuer: process.env.TOKEN_ISSUER,
      audience: process.env.TOKEN_AUDIENCE,
    },
    (err, user) => {
      if (err) {
        console.error(err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    }
  );
}

module.exports = authenticateToken;
