import { z } from "zod";

// Validation Schema For createVerification
const createVerificationSchema = z.object({
  body:z.object({

  })
})

export const verificationValidation = {
  createVerificationSchema
}