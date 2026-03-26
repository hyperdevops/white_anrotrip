import { z } from 'zod';

export const callbackBodySchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(7).max(40),
  token: z.string().min(1).max(8000),
});

export const giftBodySchema = z.object({
  fio: z.string().min(1).max(200),
  phone: z.string().min(7).max(40),
  email: z.string().email().max(320),
  token: z.string().min(1).max(8000),
});

const optionalEmail = z
  .string()
  .max(320)
  .optional()
  .transform((v) => (v === '' || v === undefined ? undefined : v))
  .pipe(z.string().email().max(320).optional());

export const reviewBodySchema = z.object({
  name: z.string().min(1).max(200),
  city: z.string().max(200).optional(),
  phone: z.string().max(40).optional(),
  email: optionalEmail,
  service: z.string().max(200).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  review: z.string().min(1).max(8000),
  token: z.string().min(1).max(8000),
});
