import * as z from 'zod';
import { ObjectId } from 'mongodb';

export const ParamsWithId = z.object({
  id: z
    .string()
    .min(1)
    .refine(value => {
      try {
        return new ObjectId(value);
      } catch (error) {
        return false;
      }
    }, {
      message: 'Invalid Object Id',
    }),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
