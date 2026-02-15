import { getUserByIdParams } from "@/http/routes/users/schemas/getUserByIdSchema.js"
import { UserAlreadyExistsError } from "@/use-cases/users/errors/index.js"
import { makeGetUserProfileUseCase } from "@/use-cases/users/factories/makeGetUserProfileUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function getUserByIdController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const { userId } = getUserByIdParams.parse(req.params)

	try {
		const getUserProfileUseCase = makeGetUserProfileUseCase()

		const user = await getUserProfileUseCase.execute({ userId })

		return reply.status(200).send(user)
	} catch (error) {
		if (error instanceof UserAlreadyExistsError)
			reply.status(400).send({ message: error.message })

		throw error
	}
}
