import type { Gym } from "@/models/Gym.js"
import type { GymRepository } from "@/repositories/interface/gymRepository.js"

interface SearchNearbyGymRequest {
	userLatitude: number
	userLongitude: number
}

interface SearchNearbyGymResponse {
	gyms: Gym[]
}

export class SearchNearbyGymUseCase {
	constructor(private gymRepository: GymRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: SearchNearbyGymRequest): Promise<SearchNearbyGymResponse> {
        
		const gyms = await this.gymRepository.searchManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return { gyms }
	}
}
