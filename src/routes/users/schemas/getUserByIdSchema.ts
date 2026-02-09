import z from "zod"

export const getUserByIdParams = z.object({
	userId: z.string(),
})

export type GetUserById = z.infer<typeof getUserByIdParams>
