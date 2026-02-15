import type { authenticateUserBody } from "@/http/routes/authenticate/schemas/authenticateSchema.js"
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
		const { user } = await authenticateUseCase.execute({ email, password })

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id as string,
				},
			},
		)

		return reply.status(200).send({
			token,
		})
	} catch (error) {
		if (error instanceof InvalidCredentialsError)
			reply.status(400).send({ message: error.message })

		throw error
	}
}
