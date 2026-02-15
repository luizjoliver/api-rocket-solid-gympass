import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import {
	type GetAllUserCheckInParams,
	type GetAllUserCheckInQuery,
	getAllUserCheckInParams,
	getAllUserCheckInQuery,
} from "@/routes/users/schemas/getAllUserCheckIns.js"
import { makeGetUserCheckInsHistoryUseCase } from "@/use-cases/users/factories/makeGetUserCheckInsHistoryUseCase.js"
import { GetUserCheckInsHistoryUseCase } from "@/use-cases/users/getUserCheckInsHistory.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function getAllUserCheckInHistoryController(
	req: FastifyRequest<{
		Params: GetAllUserCheckInParams
		Querystring: GetAllUserCheckInQuery
	}>,
	reply: FastifyReply,
) {
	const { userId } = getAllUserCheckInParams.parse(req.params)
	const { page } = getAllUserCheckInQuery.parse(req.query)

	try {
		const checkInUseCase = makeGetUserCheckInsHistoryUseCase()

		const checkIn = await checkInUseCase.execute({
			userId,
			page,
		})

		return reply.status(200).send(checkIn)
	} catch (error) {
		if (error instanceof Error) {
			return reply.status(400).send({ message: error.message })
		}

		throw error
	}
}
