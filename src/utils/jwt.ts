import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES = "2h";

export const signToken = (payload: object): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as any;
