import { authenticateUserController } from "@/controllers/users/authenticate.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { authenticateUserBodySchema } from "./schemas/authenticateSchema.js"

export function AuthenticateRoute(app: FastifyInstanceType) {
	app.post(
		"/sessions",
		{ schema: { body: authenticateUserBodySchema } },
		authenticateUserController,
	)
}
