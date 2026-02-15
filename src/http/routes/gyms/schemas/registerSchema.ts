import z from "zod"

export const registerGymBodySchema = z.object({
	title: z.string(),
	phone: z.string().optional().nullish(),
	description: z.string().optional().nullish(),
	longitude: z.number(),
	latitude: z.number(),
})

export type RegisterGymBody = z.infer<typeof registerGymBodySchema>
