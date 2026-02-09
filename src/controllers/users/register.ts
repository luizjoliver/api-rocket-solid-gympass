import type { RegisterBody } from "@/routes/users/schemas/registerSchema.js"
import { UserAlreadyExistsError } from "@/use-cases/users/errors/index.js"
import { makeRegisterUseCase } from "@/use-cases/users/factories/makeRegisterUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function registerUserController(
	req: FastifyRequest<{ Body: RegisterBody }>,
	reply: FastifyReply,
) {
	const { email, name, password } = req.body

	try {
		const registerUseCase = makeRegisterUseCase()
		await registerUseCase.execute({ email, password, name })
	} catch (error) {
		if (error instanceof UserAlreadyExistsError)
			reply.status(409).send({ message: error.message })

		throw error
	}

	return reply.status(201).send()
}
