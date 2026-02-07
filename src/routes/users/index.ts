import { registerUserController } from "@/controllers/users/register.js"
import type { FastifyInstanceType } from "@/models/types/index.js"
import { registerBodySchema } from "./schemas/registerSchema.js"

export function UsersRoutes(app: FastifyInstanceType) {
	app.post("/users",{schema: {body: registerBodySchema,}},registerUserController)
}
