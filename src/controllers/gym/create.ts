import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import type { RegisterGymBody } from "@/routes/gyms/schemas/registerSchema.js"
import { CreateGymUseCase } from "@/use-cases/gym/createGym.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function CreateGymController(
	req: FastifyRequest<{ Body: RegisterGymBody }>,
	reply: FastifyReply,
) {
	const { latitude, longitude, title, description, phone } = req.body

	try {
		const gymRepository = new PrismaGymRepository()
		const createGymUseCase = new CreateGymUseCase(gymRepository)

		await createGymUseCase.execute({
			title,
			latitude,
			longitude,
			description: description ?? null,
			phone: phone ?? null,
		})
	} catch (error) {
		//Melhorar Erro
		if (error instanceof Error)
			reply.status(400).send({ message: error.message })

		throw error
	}

	return reply.status(201).send()
}
