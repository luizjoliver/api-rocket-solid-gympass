import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import type { GetAllUserMetrics } from "@/routes/users/schemas/getAllUserMetrics.js"
import { GetUserMetricsUseCase } from "@/use-cases/users/getUserMetrics.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function getAllUserMetricsController(
	req: FastifyRequest<{
		Params: GetAllUserMetrics
	}>,
	reply: FastifyReply,
) {
	const { userId } = req.params

	try {
		const prismaRepository = new PrismaCheckInRepository()

		const checkInUseCase = new GetUserMetricsUseCase(prismaRepository)
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
