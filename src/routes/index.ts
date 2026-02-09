import type { FastifyInstance } from "fastify"
import { AuthenticateRoute } from "./authenticate/index.js"
import { UsersRoutes } from "./users/index.js"

export function Routes(app: FastifyInstance) {
	app.register(UsersRoutes)
	app.register(AuthenticateRoute)
}
