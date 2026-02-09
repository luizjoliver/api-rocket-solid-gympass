import type { CheckIn } from "@/models/CheckIn.js"
import { randomUUID } from "node:crypto"
import type { CheckInRepository } from "../interface/checkInsRepository.js"

export class InMemoryCheckInsRepository implements CheckInRepository {
	public items: CheckIn[] = []

	async create(data: CheckIn) {
		const checkIn = {
			id: randomUUID(),
			userId: data.userId,
			gymId: data.userId,
			validated_at: data.createdAt ? new Date(data.createdAt) : null,
			created_at: new Date(),
		}

		this.items.push(checkIn)

		return checkIn
	}
}
