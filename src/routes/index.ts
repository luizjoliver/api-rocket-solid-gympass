import type { FastifyInstance } from "fastify"
import { UsersRoutes } from "./users/index.js"

export function Routes(app: FastifyInstance) {
	app.register(UsersRoutes)
}
