import type { authenticateUserBody } from "@/routes/authenticate/schemas/authenticateSchema.js"
import { InvalidCredentialsError } from "@/use-cases/authenticate/errors/invalidCredentialsError.js"
import { makeAuthenticateUseCase } from "@/use-cases/authenticate/factories/makeAuthenticateUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function authenticateUserController(
	req: FastifyRequest<{ Body: authenticateUserBody }>,
	reply: FastifyReply,
) {
	const { email, password } = req.body

	try {
		const authenticateUseCase = makeAuthenticateUseCase()
		await authenticateUseCase.execute({ email, password })
	} catch (error) {
		if (error instanceof InvalidCredentialsError)
			reply.status(400).send({ message: error.message })

		throw error
	}

	return reply.status(200).send()
}
