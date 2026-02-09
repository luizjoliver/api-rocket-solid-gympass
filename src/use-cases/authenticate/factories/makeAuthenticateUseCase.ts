import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository.js"
import { AuthenticateUseCase } from "../authenticate.js"

export function makeAuthenticateUseCase() {
	const prismaRepository = new PrismaUsersRepository()
	const authenticateUseCase = new AuthenticateUseCase(prismaRepository)

	return authenticateUseCase
}
