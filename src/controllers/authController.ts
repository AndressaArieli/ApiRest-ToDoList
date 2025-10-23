import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validations/schemas";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.errors });
  try {
    const user = await authService.registerUser(
      parsed.data.email,
      parsed.data.password
    );
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.errors });
  try {
    const token = await authService.loginUser(
      parsed.data.email,
      parsed.data.password
    );
    return res.json({ token });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
};
