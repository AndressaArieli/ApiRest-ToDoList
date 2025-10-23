import crypto from "crypto";

export const generateId = (): string => crypto.randomUUID();

export const nowIso = (): string => new Date().toISOString();
