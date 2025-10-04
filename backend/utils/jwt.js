import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    userId: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}
