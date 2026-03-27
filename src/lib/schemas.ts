import { z } from 'zod';

export const callbackBodySchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(7).max(40),
  token: z.string().min(1).max(8000),
});

export const giftBodySchema = z.object({
  fio: z.string().min(1).max(200),
  phone: z.string().min(7).max(40),
  email: z.email().max(320),
  token: z.string().min(1).max(8000),
});

/** Пустая строка и undefined → undefined; иначе email ≤320 символов (Zod 4). */
const optionalEmail = z.preprocess(
  (val) => (val === '' || val === undefined ? undefined : val),
  z.email().max(320).optional(),
);

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
