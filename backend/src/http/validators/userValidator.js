import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid Email Address'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .max(64, 'Password must have a maximum of 64 characters')
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one number.',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Password must contain at least one special character.',
    }),
  role: z.enum(['admin', 'agent', 'customer']),
  teamId: z.number().int().optional(),
});

export { createUserSchema };
