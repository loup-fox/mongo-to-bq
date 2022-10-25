import { ObjectId } from "mongodb";
import { z } from "zod";

export const Mail = z.object({
  accountId: z.instanceof(ObjectId),
  accountLocalization: z.string(),
  boxName: z.string(),
  createdAt: z.date(),
  createdAtDay: z.date(),
  date: z.date(),
  dateDay: z.date(),
  deletedAt: z.date().optional(),
  deletedAtDay: z.date().optional(),
  domain: z.string(),
  expiresAt: z.date().nullable().optional(),
  expiresAtDay: z.date().nullable().optional(),
  from: z.string(),
  isSpam: z.boolean(),
  isTrash: z.boolean(),
  listUnsubscribe: z.string().nullable(),
  name: z.string().nullable(),
  newsletter: z.boolean().optional(),
  seen: z.boolean(),
  signature: z.string(),
  uid: z.string(),
  updatedAt: z.date(),
  updatedAtDay: z.date(),
  userId: z.instanceof(ObjectId),
});
export type Mail = z.infer<typeof Mail>;
