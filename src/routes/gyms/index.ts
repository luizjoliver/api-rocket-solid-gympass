import { CreateGymController } from "@/http/controllers/gym/create.js"
import { SearchGymController } from "@/http/controllers/gym/search.js"
import { SearchNearbyGymController } from "@/http/controllers/gym/searchNearby.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { registerGymBodySchema } from "./schemas/registerSchema.js"
import { searchGymQuerySchema } from "./schemas/searchSchema.js"
import { searchNearbyGymQuerySchema } from "./schemas/searchyNearbySchema.js"

export function GymRoutes(app: FastifyInstanceType) {
	app.post(
		"/gyms",
		{ schema: { body: registerGymBodySchema } },
		CreateGymController,
	)
	app.get(
		"/gyms/search",
		{ schema: { querystring: searchGymQuerySchema } },
		SearchGymController,
	)

	app.get(
		"/gyms/nearby",
		{ schema: { querystring: searchNearbyGymQuerySchema } },
		SearchNearbyGymController,
	)
}
