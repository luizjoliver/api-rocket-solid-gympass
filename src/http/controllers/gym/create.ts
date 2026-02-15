import type { RegisterGymBody } from "@/http/routes/gyms/schemas/registerSchema.js"
import { makeCreateGymUseCase } from "@/use-cases/users/factories/makeCreateGymUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function CreateGymController(
	req: FastifyRequest<{ Body: RegisterGymBody }>,
	reply: FastifyReply,
) {
	const { latitude, longitude, title, description, phone } = req.body

	try {
		const createGymUseCase = makeCreateGymUseCase()

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
