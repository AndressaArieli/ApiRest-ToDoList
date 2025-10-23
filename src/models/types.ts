export type ID = string;

export interface User {
  id: ID;
  email: string;
  passwordHash: string;
}

export interface Task {
  id: ID;
  userId: ID;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}
