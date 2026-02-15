import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import { CreateGymUseCase } from "@/use-cases/gym/createGym.js"

export function makeCreateGymUseCase() {
	const gymRepository = new PrismaGymRepository()
	const createGymUseCase = new CreateGymUseCase(gymRepository)

	return createGymUseCase
}
