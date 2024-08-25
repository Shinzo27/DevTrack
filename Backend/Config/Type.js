import { string, z } from 'zod'

export const signupParser = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string(),
    role: z.string()
})

export const signinParser = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const projectParser = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    deadline: z.string(),
    users: z.object({
        id: z.string(),
        role: z.string()
    }).optional(),
    tasks: z.optional(),
    startDate: z.string()
})

export const newUserParser = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    role: z.string()
})

export const editProjetParser = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    deadline: z.string().min(1)
})

export const taskParser = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.string().min(1),
    deadline: z.string().min(1),
    assignedTo: z.string().min(1),
    projectId: z.string().min(1),
})