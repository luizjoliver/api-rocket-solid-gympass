import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository.js"
import { RegisterUsersUseCase } from "../registerUser.js"

export function makeRegisterUseCase() {
	const prismaRepository = new PrismaUsersRepository()
	const registerUseCase = new RegisterUsersUseCase(prismaRepository)

	return registerUseCase
}
