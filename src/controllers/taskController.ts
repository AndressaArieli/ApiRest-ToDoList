import { Request, Response } from "express";
import { createTaskSchema, updateTaskSchema } from "../validations/schemas";
import * as taskService from "../services/taskService";

const getUserId = (req: Request) => (req as any).user?.userId as string;

export const createTask = (req: Request, res: Response) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.errors });
  try {
    const userId = getUserId(req);
    const task = taskService.createTask(
      userId,
      parsed.data.title,
      parsed.data.description
    );
    return res.status(201).json(task);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const listTasks = (req: Request, res: Response) => {
  const userId = getUserId(req);
  const list = taskService.listTasks(userId);
  return res.json(list);
};

export const getTaskById = (req: Request, res: Response) => {
  const userId = getUserId(req);
  const task = taskService.getTask(userId, req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  return res.json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.errors });
  try {
    const userId = getUserId(req);
    const updated = taskService.updateTask(
      userId,
      req.params.id,
      parsed.data as any
    );
    return res.json(updated);
  } catch (err: any) {
    if (err.message === "Task not found")
      return res.status(404).json({ error: err.message });
    return res.status(500).json({ error: err.message });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    taskService.deleteTask(userId, req.params.id);
    return res.status(204).send();
  } catch (err: any) {
    if (err.message === "Task not found")
      return res.status(404).json({ error: err.message });
    return res.status(500).json({ error: err.message });
  }
};
