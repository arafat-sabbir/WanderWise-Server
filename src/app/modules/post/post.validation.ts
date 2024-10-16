import { z } from "zod";

// Validation Schema For createPost
const createPostSchema = z.object({
  body:z.object({

  })
})

export const postValidation = {
  createPostSchema
}