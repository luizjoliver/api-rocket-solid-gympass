import { z } from "zod"

export const getAllUserCheckInParams = z.object({
	userId: z.string(),
})

export const getAllUserCheckInQuery = z.object({
	page: z.coerce.number().default(1),
})

export type GetAllUserCheckInParams = z.infer<typeof getAllUserCheckInParams>
export type GetAllUserCheckInQuery = z.infer<typeof getAllUserCheckInQuery>
