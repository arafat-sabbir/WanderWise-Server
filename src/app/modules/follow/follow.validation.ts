import { z } from "zod";

// Validation Schema For createFollow
const createFollowSchema = z.object({
  body:z.object({

  })
})

export const followValidation = {
  createFollowSchema
}