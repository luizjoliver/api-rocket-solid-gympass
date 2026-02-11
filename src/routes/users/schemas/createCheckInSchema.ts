import z from "zod"

export const createCheckInBody = z.object({
	userId: z.string(),
	gymId: z.string(),
	userLatitude: z.number(),
	userLongitude: z.number(),
})

export type CreateCheckInBody = z.infer<typeof createCheckInBody>
