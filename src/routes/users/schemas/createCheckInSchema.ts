import z from "zod"

export const createCheckInBody = z.object({
	userId: z.string(),
	gymId: z.string(),
})

export type CreateCheckInBody = z.infer<typeof createCheckInBody>
