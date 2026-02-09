import type { GetUserById } from "@/routes/users/schemas/getUserByIdSchema.js"
import { UserAlreadyExistsError } from "@/use-cases/users/errors/index.js"
import { makeGetUserProfile } from "@/use-cases/users/factories/makeGetUserProfile.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function getUserByIdController(
	req: FastifyRequest<{ Params: GetUserById }>,
	reply: FastifyReply,
) {
	const { userId } = req.params

	try {
		const getUserProfileUseCase = makeGetUserProfile()

		const user = await getUserProfileUseCase.execute({ userId })

		return reply.status(200).send(user)
	} catch (error) {
		if (error instanceof UserAlreadyExistsError)
			reply.status(400).send({ message: error.message })

		throw error
	}
}
