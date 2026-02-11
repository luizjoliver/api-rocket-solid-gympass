import type { CheckIn } from "@/models/CheckIn.js"
import dayjs from "dayjs"
import { randomUUID } from "node:crypto"
import type { CheckInRepository } from "../interface/checkInsRepository.js"

export class InMemoryCheckInsRepository implements CheckInRepository {
	public items: CheckIn[] = []
	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfDay = dayjs(date).startOf("day")
		const endOfDay = dayjs(date).endOf("day")

		const checkInOnSameDate = this.items.find((checkIn) => {
			const checkInDate = dayjs(checkIn.createdAt)

			const isOnSameDay =
				checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

			return checkIn.userId === userId && isOnSameDay
		})

		return checkInOnSameDate ?? null
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

	async findManyByUserId(userId: string, page: number) {
		return this.items
			.filter((checkin) => checkin.userId === userId)
			.slice((page - 1) * 20, 40)
	}
}
