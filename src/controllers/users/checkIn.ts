import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import type { CreateCheckInBody } from "@/routes/users/schemas/createCheckInSchema.js"
import { CheckInUseCase } from "@/use-cases/users/checkIn.js"
import { UserAlreadyExistsError } from "@/use-cases/users/errors/index.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function createCheckInController(
	req: FastifyRequest<{ Body: CreateCheckInBody }>,
	reply: FastifyReply,
) {
	const { gymId, userId, userLatitude, userLongitude } = req.body

	try {
		const prismaRepository = new PrismaCheckInRepository()
		const gymRepository = new PrismaGymRepository()
		const checkInUseCase = new CheckInUseCase(prismaRepository, gymRepository)
		const checkIn = await checkInUseCase.execute({
			gymId,
			userId,
			userLatitude,
			userLongitude,
		})

		return reply.status(201).send(checkIn)
	} catch (error) {
		if (error instanceof UserAlreadyExistsError)
			reply.status(400).send({ message: error.message })

		throw error
	}
}
