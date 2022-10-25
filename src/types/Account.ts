import { ObjectId } from "mongodb";
import { z } from "zod";

export const Account = z.object({
  _id: z.instanceof(ObjectId),
});
export type Account = z.infer<typeof Account>;
