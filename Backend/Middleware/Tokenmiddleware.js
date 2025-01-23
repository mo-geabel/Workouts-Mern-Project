import jwt from "jsonwebtoken";
import Users from "../modules/userModule.js";

export const protect = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.SECRET);
  try {
    const user = await Users.findOne({ _id }).select("_id");
    req.User = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "error with loggin" });
  }
};
