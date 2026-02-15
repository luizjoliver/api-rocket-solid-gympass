import { createCheckInController } from "@/http/controllers/users/checkIn.js"
import { getAllUserCheckInHistoryController } from "@/http/controllers/users/getAllUserCheckIns.js"
import { getAllUserMetricsController } from "@/http/controllers/users/getUserMetrics.js"
import { validateCheckInController } from "@/http/controllers/users/validateCheckIn.js"
import { verifyJWT } from "@/http/middlewares/vertifiy-jwt.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { createCheckInBody } from "./schemas/createCheckInSchema.js"
import {
	getAllUserCheckInParams,
	getAllUserCheckInQuery,
} from "./schemas/getAllUserCheckIns.js"
import { getAllUserMetrics } from "./schemas/getAllUserMetrics.js"
import { validateCheckInParams } from "./schemas/validateCheckInSchema.js"

export function CheckInRoutes(app: FastifyInstanceType) {
	app.addHook("onRequest", verifyJWT)

	app.post(
		"/checkins",
		{ schema: { body: createCheckInBody } },
		createCheckInController,
	)

	app.patch(
		"/checkins/:checkInId/validate",
		{ schema: { params: validateCheckInParams } },
		validateCheckInController,
	)

	app.get(
		"/checkins/history/:userId",
		{
			schema: {
				params: getAllUserCheckInParams,
				querystring: getAllUserCheckInQuery,
			},
		},
		getAllUserCheckInHistoryController,
	)

	app.get(
		"/checkins/metrics/:userId",
		{
			schema: {
				params: getAllUserMetrics,
			},
		},
		getAllUserMetricsController,
	)
}
