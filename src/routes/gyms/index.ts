import { CreateGymController } from "@/controllers/gym/create.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { registerGymBodySchema } from "./schemas/registerSchema.js"

export function GymRoutes(app: FastifyInstanceType) {
	app.post(
		"/gyms",
		{ schema: { body: registerGymBodySchema } },
		CreateGymController,
	)
}
