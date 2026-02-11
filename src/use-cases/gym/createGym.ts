import type { Gym } from "@/models/Gym.js"
import type { GymRepository } from "@/repositories/interface/gymRepository.js"

interface CreateGymRequest {
	title: string
	description: string | null
	phone: string | null
	longitude: number
	latitude: number
}

interface CreateGymResponse {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymRepository: GymRepository) {}

	async execute({
		description,
		title,
		phone,
		longitude,
		latitude,
	}: CreateGymRequest): Promise<CreateGymResponse> {
		const gym = await this.gymRepository.create({
			description,
			title,
			latitude,
			longitude,
			phone,
		})

		return { gym }
	}
}
