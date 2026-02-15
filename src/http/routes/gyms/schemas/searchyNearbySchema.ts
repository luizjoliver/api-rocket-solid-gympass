import { z } from "zod"

export const searchNearbyGymQuerySchema = z.object({
	latitude: z.coerce.number(),
	longitude: z.coerce.number(),
})

export type SearchNearbyGymQuery = z.infer<typeof searchNearbyGymQuerySchema>
