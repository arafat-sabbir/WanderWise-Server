import { z } from "zod";

// Validation Schema For createComment
const createCommentSchema = z.object({
  body:z.object({

  })
})

export const commentValidation = {
  createCommentSchema
}