import { z } from 'zod';

// Validation Schema For createPayment
const createPaymentSchema = z.object({
  body: z.object({}),
});

export const paymentValidation = {
  createPaymentSchema,
};

