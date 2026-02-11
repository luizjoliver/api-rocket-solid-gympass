import { createCheckInController } from "@/controllers/users/checkIn.js"
import { getAllUserCheckInHistoryController } from "@/controllers/users/getAllUserCheckIns.js"
import { getUserByIdController } from "@/controllers/users/getById.js"
import { registerUserController } from "@/controllers/users/register.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { createCheckInBody } from "./schemas/createCheckInSchema.js"
import { getUserByIdParams } from "./schemas/getUserByIdSchema.js"
import { registerBodySchema } from "./schemas/registerSchema.js"
import { getAllUserCheckInParams, getAllUserCheckInQuery } from "./schemas/getAllUserCheckIns.js"

export function UsersRoutes(app: FastifyInstanceType) {
	app.post(
		"/users",
		{ schema: { body: registerBodySchema } },
		registerUserController,
	)
	app.post(
		"/user/:userId/checkins",
		{ schema: { body: createCheckInBody } },
		createCheckInController,
	)
	app.get(
		"/user/:userId",
		{ schema: { params: getUserByIdParams } },
		getUserByIdController,
	)
	app.get(
		"/user/history/:userId",
		{
			schema: {
				params: getAllUserCheckInParams,
				querystring: getAllUserCheckInQuery,
			},
		},
		getAllUserCheckInHistoryController,
	)
}
