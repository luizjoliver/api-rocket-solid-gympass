import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository.js"
import { GetUserProfileUseCase } from "../getUserProfile.js"

export function makeGetUserProfileUseCase () {
	const prismaRepository = new PrismaUsersRepository()
	const getUserProfileUseCase = new GetUserProfileUseCase(prismaRepository)

	return getUserProfileUseCase
}
