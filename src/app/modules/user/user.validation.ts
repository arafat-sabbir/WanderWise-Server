import { z } from 'zod';

// Create User Schema
const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name Is Required',
    }),
    email: z
      .string({
        required_error: 'Email Is Required',
      })
      .email({
        message: 'Invalid Email Address',
      }),
    password: z
      .string({
        required_error: 'Password Is Required',
      })
      .min(6, 'Password Must Be At Least 6 Characters Long'),
    bio: z.string({
      required_error: 'Bio Is Required',
    }),
  }),
});

// Login User Schema
const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email Is Required',
      })
      .email({
        message: 'Invalid Email Address',
      }),
    password: z
      .string({
        required_error: 'Password Is Required',
      })
      .min(6, 'Password Must Be At Least 6 Characters Long'),
  }),
});

const followOrUnFollowUser = z.object({
  body: z.object({
    status: z.enum(['follow', 'unfollow'], {
      invalid_type_error: "Status must be either 'follow' or 'unfollow'",
      required_error:"Please Provide A Status"
    }),
  }),
});


const updateUserRole = z.object({
  body: z.object({
    role: z.enum(['admin', 'user'], {
      invalid_type_error: "Role must be either 'admin' or 'user'",
      required_error:"Please Provide A Role"
    }),
  }),
})
export const userValidation = {
  createUserSchema,
  loginUserSchema,
  followOrUnFollowUser,
  updateUserRole
};

