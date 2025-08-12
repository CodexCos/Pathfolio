import jwt from "jsonwebtoken";
import { UNAUTHORIZED, FORBIDDEN } from "../const/http.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: "Access token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    return res.status(FORBIDDEN).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
