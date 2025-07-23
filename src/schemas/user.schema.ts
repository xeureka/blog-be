import * as z from 'zod'

export const registerSchema = z.object({
    username: z.string().min(3).max(8).lowercase(),
    email: z.string().email(),
    password: z.string().min(6)
})


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

