import { z } from 'zod';

const createTeamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export { createTeamSchema };
