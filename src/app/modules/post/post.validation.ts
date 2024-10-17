import { z } from 'zod';

const tagsSchema = z.preprocess((input) => {
  if (typeof input === 'string') {
    return [input]; // Convert single string to array
  }
  return input;
}, z.array(z.string()).min(1, 'At Least One Tag Is Required'));

// Validation Schema For createPost
const createPostSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required',
    }),
    content: z.string({
      required_error: 'Content Is Required',
    }),
    category: z.string({
      required_error: 'Category Is Required',
    }),
    isPremium: z.boolean().optional(),
    tags: tagsSchema,
  }),
});

const votePostValidation = z.object({
  body: z.object({
    status: z.enum(['upvote', 'downvote'],{invalid_type_error:"Status must be either 'upvote' or 'downvote'"}),
  }),
});

export const postValidation = {
  createPostSchema,
  votePostValidation,
};

