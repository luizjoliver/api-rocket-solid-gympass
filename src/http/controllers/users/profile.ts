import { InvalidCredentialsError } from "@/use-cases/authenticate/errors/invalidCredentialsError.js"
import { makeGetUserProfileUseCase } from "@/use-cases/users/factories/makeGetUserProfileUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function profileUsersController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	await req.jwtVerify()

	const userId = req.user.sub

	try {
		const authenticateUseCase = makeGetUserProfileUseCase()
		const userProfile = await authenticateUseCase.execute({ userId })

		return reply.status(200).send(userProfile)
	} catch (error) {
		if (error instanceof InvalidCredentialsError)
			reply.status(400).send({ message: error.message })

		throw error
	}
}
