import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import type { CreateCheckInBody } from "@/routes/users/schemas/createCheckInSchema.js"
import { CheckInUseCase } from "@/use-cases/users/checkIn.js"
import { UserAlreadyExistsError } from "@/use-cases/users/errors/index.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function createCheckInController(
	req: FastifyRequest<{ Body: CreateCheckInBody }>,
	reply: FastifyReply,
) {
	const { gymId, userId } = req.body

	try {
		const prismaRepository = new PrismaCheckInRepository()
		const checkInUseCase = new CheckInUseCase(prismaRepository)
		const checkIn = await checkInUseCase.execute({ gymId, userId })

		return reply.status(201).send(checkIn)
	} catch (error) {
		if (error instanceof UserAlreadyExistsError)
			reply.status(400).send({ message: error.message })

		throw error
	}
}
