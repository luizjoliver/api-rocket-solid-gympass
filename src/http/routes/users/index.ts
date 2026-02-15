import { getUserByIdController } from "@/http/controllers/users/getById.js"
import { profileUsersController } from "@/http/controllers/users/profile.js"
import { registerUserController } from "@/http/controllers/users/register.js"
import { verifyJWT } from "@/http/middlewares/vertifiy-jwt.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { getUserByIdParams } from "./schemas/getUserByIdSchema.js"
import { registerBodySchema } from "./schemas/registerSchema.js"

export function UsersRoutes(app: FastifyInstanceType) {
	app.post(
		"/users",
		{ schema: { body: registerBodySchema } },
		registerUserController,
	)
	//authenticated
	app.get(
		"/user/:userId",
		{ schema: { params: getUserByIdParams }, onRequest: verifyJWT },
		getUserByIdController,
	)

	app.get(
		"/me",
		{
			onRequest: verifyJWT,
		},
		profileUsersController,
	)
}
