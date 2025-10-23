import { tasks } from "../models/db";
import { Task } from "../models/types";
import { generateId, nowIso } from "../utils";

export const createTask = (
  userId: string,
  title: string,
  description?: string
): Task => {
  const task: Task = {
    id: generateId(),
    userId,
    title,
    description,
    completed: false,
    createdAt: nowIso(),
  };
  tasks.push(task);
  return task;
};

export const listTasks = (userId: string): Task[] =>
  tasks.filter((t) => t.userId === userId);

export const getTask = (userId: string, id: string): Task | undefined =>
  tasks.find((t) => t.userId === userId && t.id === id);

export const updateTask = (
  userId: string,
  id: string,
  patch: Partial<Task>
): Task => {
  const idx = tasks.findIndex((t) => t.userId === userId && t.id === id);
  if (idx === -1) throw new Error("Task not found");
  const existing = tasks[idx];
  const updated: Task = { ...existing, ...patch, updatedAt: nowIso() } as Task;
  tasks[idx] = updated;
  return updated;
};

export const deleteTask = (userId: string, id: string): void => {
  const idx = tasks.findIndex((t) => t.userId === userId && t.id === id);
  if (idx === -1) throw new Error("Task not found");
  tasks.splice(idx, 1);
};
