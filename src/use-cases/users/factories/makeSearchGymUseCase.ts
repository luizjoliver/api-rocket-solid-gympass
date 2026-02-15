import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import { CreateGymUseCase } from "@/use-cases/gym/createGym.js"
import { SearchGymUseCase } from "@/use-cases/gym/search.js"

export function makeSearchGymUseCase() {
	const gymRepository = new PrismaGymRepository()
	const searchGymUseCase = new SearchGymUseCase(gymRepository)

	return searchGymUseCase
}
