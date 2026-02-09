import type { Gym } from "@/models/Gym.js"
import type { GymRepository } from "../interface/gymRepository.js"

export class InMemoryGymRepository implements GymRepository {
	public items: Gym[] = []
	async findById(gymId: string): Promise<Gym | null> {
		const gym = this.items.find((gym) => gym.id === gymId)
		if (!gym) return null
		return gym
	}
}
