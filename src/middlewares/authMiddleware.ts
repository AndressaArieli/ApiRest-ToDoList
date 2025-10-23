import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  if (!header)
    return res.status(401).json({ error: "Missing authorization header" });
  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ error: "Invalid authorization format" });
  const token = parts[1];
  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    return next();
  } catch (err: any) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
