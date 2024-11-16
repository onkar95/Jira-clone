import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'required'),
})

export const registerSchema = z.object({
    name: z.string().min(1, 'required'),
    email: z.string().email(),
    password: z.string().min(8, 'Minimun 8 characters'),
})
