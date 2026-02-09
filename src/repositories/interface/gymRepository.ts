import type { Gym } from "@/models/Gym.js"

export interface GymRepository {
	findById(gymId: string): Promise<Gym | null>
}
