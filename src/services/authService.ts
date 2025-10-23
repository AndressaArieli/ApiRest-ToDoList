import bcrypt from "bcrypt";
import { users } from "../models/db";
import { generateId } from "../utils";
import { signToken } from "../utils/jwt";
import { User } from "../models/types";

const SALT_ROUNDS = 10;

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error("User already exists");
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user: User = { id: generateId(), email, passwordHash };
  users.push(user);
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("Invalid credentials");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");
  return signToken({ userId: user.id, email: user.email });
};
