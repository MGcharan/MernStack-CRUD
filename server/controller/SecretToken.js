import jwt from "jsonwebtoken";

const secretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: "1d" });
};

export default secretToken;
