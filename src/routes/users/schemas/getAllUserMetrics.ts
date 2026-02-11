import { z } from "zod"

export const getAllUserMetrics = z.object({
	userId: z.string(),
})

export type GetAllUserMetrics = z.infer<typeof getAllUserMetrics>
