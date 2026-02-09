import type { CheckIn } from "@/models/CheckIn.js"
import dayjs from "dayjs"
import { randomUUID } from "node:crypto"
import type { CheckInRepository } from "../interface/checkInsRepository.js"

export class InMemoryCheckInsRepository implements CheckInRepository {
	public items: CheckIn[] = []
	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<CheckIn | null> {
		const checkInOnSameDate = this.items.find((checkIn) => {
			const endOfTheDay = dayjs(date).endOf("date")
			const checkInDate = dayjs(checkIn.createdAt)

			const isOnOtherDay = checkInDate.isAfter(endOfTheDay)

			return checkIn.userId === userId && isOnOtherDay
		})

		if (!checkInOnSameDate) return null

		return checkInOnSameDate
	}
	async create({ userId, gymId }: { userId: string; gymId: string }) {
		const checkIn: CheckIn = {
			id: randomUUID(),
			userId,
			gymId,
			createdAt: new Date(),
			validatedAt: null,
		}

		this.items.push(checkIn)

		return checkIn
	}
}
