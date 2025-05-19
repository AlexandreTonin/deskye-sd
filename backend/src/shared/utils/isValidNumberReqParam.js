import { z } from 'zod';

const idParamSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'ID must be a valid positive number',
    }),
});

export { idParamSchema };
