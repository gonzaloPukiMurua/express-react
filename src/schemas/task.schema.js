import {z} from "zod";

export const taskSchema = z.object({
    name: z.string({
        required_error: "Title required:"
    }),
    description: z.string({
        required_error: "Description required."
    }),
    date: z
    .string({
        required_error: "Date required."
    })
    .datetime()
    .optional()
})