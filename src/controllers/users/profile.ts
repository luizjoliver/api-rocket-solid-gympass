import type { FastifyReply, FastifyRequest } from "fastify"

export async function profileUsersController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	// try {
	// 	const authenticateUseCase = makeAuthenticateUseCase()
	// 	await authenticateUseCase.execute({ email, password })
	// } catch (error) {
	// 	if (error instanceof InvalidCredentialsError)
	// 		reply.status(400).send({ message: error.message })

	// 	throw error
	// }

	return reply.status(200).send()
}
