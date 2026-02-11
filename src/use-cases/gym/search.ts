import type { Gym } from "@/models/Gym.js"
import type { GymRepository } from "@/repositories/interface/gymRepository.js"

interface SearchGymRequest {
	query: string
	page?: number
}

interface SearchGymResponse {
	gyms: Gym[]
}

export class SearchGymUseCase {
	constructor(private gymRepository: GymRepository) {}

	async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
		const gyms = await this.gymRepository.searchMany(query, page)

		return { gyms }
	}
}
