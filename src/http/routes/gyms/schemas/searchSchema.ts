import { z } from "zod"

export const searchGymQuerySchema = z.object({
	query: z.string().min(1),
	page: z.coerce.number().min(1).default(1),
})

export type SearchGymQuery = z.infer<typeof searchGymQuerySchema>
