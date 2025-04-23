import { z } from 'zod';

export const updateCheckedSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number), // vem da URL como string
  body: z.object({
    checked: z.boolean(),
  }),
});
