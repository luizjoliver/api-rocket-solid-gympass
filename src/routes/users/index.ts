import { getUserByIdController } from "@/controllers/users/getById.js"
import { registerUserController } from "@/controllers/users/register.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { getUserByIdParams } from "./schemas/getUserByIdSchema.js"
import { registerBodySchema } from "./schemas/registerSchema.js"

export function UsersRoutes(app: FastifyInstanceType) {
	app.post(
		"/users",
		{ schema: { body: registerBodySchema } },
		registerUserController,
	)
	app.get(
		"/user/:userId",
		{ schema: { params: getUserByIdParams } },
		getUserByIdController,
	)
}
