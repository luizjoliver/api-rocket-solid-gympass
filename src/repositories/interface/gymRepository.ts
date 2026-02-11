import type { Gym } from "@/models/Gym.js"

export interface FindManyNearbyParams {
	latitude: number
	longitude: number
}
export interface GymRepository {
	findById(gymId: string): Promise<Gym | null>
	create(gym: Gym): Promise<Gym>
	searchMany(query: string, page?: number): Promise<Gym[]>
	searchManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
