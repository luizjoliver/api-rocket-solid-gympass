import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository.js"
import type { RegisterBody } from "@/routes/users/schemas/registerSchema.js"
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
	} catch (_) {
		return reply.status(400).send()
	}

	return reply.status(201).send()
}
