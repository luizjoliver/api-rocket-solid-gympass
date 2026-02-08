import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository.js"
import type { RegisterBody } from "@/routes/users/schemas/registerSchema.js"
import { userAlreadyExistsError } from "@/use-cases/users/errors/index.js"
import { RegisterUsersUseCase } from "@/use-cases/users/register-user.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function registerUserController(
	req: FastifyRequest<{ Body: RegisterBody }>,
	reply: FastifyReply,
) {
	const { email, name, password } = req.body

	try {
		const primsaRepository = new PrismaUsersRepository()

		const registerUseCase = new RegisterUsersUseCase(primsaRepository)
		await registerUseCase.execute({ email, password, name })
	} catch (error) {
		if (error instanceof userAlreadyExistsError)
			reply.status(409).send({ message: error.message })

		throw error
	}

	return reply.status(201).send()
}
