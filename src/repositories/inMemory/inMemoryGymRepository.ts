import type { Gym } from "@/models/Gym.js"
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates.js"
import { randomUUID } from "node:crypto"
import type {
	FindManyNearbyParams,
	GymRepository,
} from "../interface/gymRepository.js"

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
	async searchMany(query: string, page: number) {
		const filteredGyms = this.items.filter((gym) =>
			gym.title.toLowerCase().includes(query.toLowerCase()),
		)

		const gyms = filteredGyms.slice((page - 1) * 20, page * 20)

		return gyms
	}

	async searchManyNearby(params: FindManyNearbyParams) {
		return this.items.filter((item) => {
			const distance = getDistanceBetweenCoordinates(
				{ latitude: params.latitude, longitude: params.longitude },
				{
					latitude: item.latitude,
					longitude: item.longitude,
				},
			)

			return distance < 10
		})
	}
}
