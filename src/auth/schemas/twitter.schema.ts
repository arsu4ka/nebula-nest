import { z } from 'zod';

export const twitterUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
});

export type TwitterUser = z.infer<typeof twitterUserSchema>;
