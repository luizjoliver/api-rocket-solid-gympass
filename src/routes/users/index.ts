import { createCheckInController } from "@/http/controllers/users/checkIn.js"
import { getAllUserCheckInHistoryController } from "@/http/controllers/users/getAllUserCheckIns.js"
import { getUserByIdController } from "@/http/controllers/users/getById.js"
import { getAllUserMetricsController } from "@/http/controllers/users/getUserMetrics.js"
import { profileUsersController } from "@/http/controllers/users/profile.js"
import { registerUserController } from "@/http/controllers/users/register.js"
import { verifyJWT } from "@/http/middlewares/vertifiy-jwt.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { createCheckInBody } from "./schemas/createCheckInSchema.js"
import {
	getAllUserCheckInParams,
	getAllUserCheckInQuery,
} from "./schemas/getAllUserCheckIns.js"
import { getAllUserMetrics } from "./schemas/getAllUserMetrics.js"
import { getUserByIdParams } from "./schemas/getUserByIdSchema.js"
import { registerBodySchema } from "./schemas/registerSchema.js"

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
	app.get(
		"/user/metrics/:userId",
		{
			schema: {
				params: getAllUserMetrics,
			},
		},
		getAllUserMetricsController,
	)

	//authenticated
	app.get(
		"/me",
		{
			onRequest: verifyJWT,
		},
		profileUsersController,
	)
}
