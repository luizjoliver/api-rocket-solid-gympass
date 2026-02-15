import type { GetAllUserMetrics } from "@/routes/users/schemas/getAllUserMetrics.js"
import { makeGetUserMetricsUseCase } from "@/use-cases/users/factories/makeGetUserMetricsUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function getAllUserMetricsController(
	req: FastifyRequest<{
		Params: GetAllUserMetrics
	}>,
	reply: FastifyReply,
) {
	const { userId } = req.params

	try {
		const checkInUseCase = makeGetUserMetricsUseCase()
		const checkInMetrics = await checkInUseCase.execute({
			userId,
		})

		return reply.status(200).send(checkInMetrics)
	} catch (error) {
		if (error instanceof Error)
			reply.status(400).send({ message: error.message })

		throw error
	}
}
