import type { Gym } from "@/models/Gym.js"
import { randomUUID } from "node:crypto"
import type { GymRepository } from "../interface/gymRepository.js"

export class InMemoryGymRepository implements GymRepository {
	public items: Gym[] = []
	async findById(gymId: string): Promise<Gym | null> {
		const gym = this.items.find((gym) => gym.id === gymId)
		if (!gym) return null
		return gym
	}
	async create(data: Gym): Promise<Gym> {
		const gym: Gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			latitude: data.latitude,
			longitude: data.longitude,
		}

		if (data.description !== undefined) {
			gym.description = data.description
		}

		if (data.phone !== undefined) {
			gym.phone = data.phone
		}

		this.items.push(gym)

		return gym
	}
}
