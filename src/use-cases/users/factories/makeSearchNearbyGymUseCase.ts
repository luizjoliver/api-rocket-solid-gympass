import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import { SearchNearbyGymUseCase } from "@/use-cases/gym/searchNearbyGym.js"

export function makeSearchGymNearbyUseCase() {
	const gymRepository = new PrismaGymRepository()
	const searchNearbyGymUseCase = new SearchNearbyGymUseCase(gymRepository)

	return searchNearbyGymUseCase
}
