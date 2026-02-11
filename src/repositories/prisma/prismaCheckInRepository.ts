import type { CheckIn } from "@/models/CheckIn.js"
import { prisma } from "@/utils/db/prisma.js"
import dayjs from "dayjs"
import type { CheckInRepository } from "../interface/checkInsRepository.js"

export class PrismaCheckInRepository implements CheckInRepository {
	findManyByUserId(userId: string, page?: number): Promise<CheckIn[]> {
		throw new Error("Method not implemented.")
	}
	async create(data: { userId: string; gymId: string }): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.create({
			data: {
				user_id: data.userId,
				gym_id: data.gymId,
			},
		})

		return {
			id: checkIn.id,
			createdAt: checkIn.created_at,
			validatedAt: checkIn.validated_at,
			userId: checkIn.user_id,
			gymId: checkIn.gym_id,
		}
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<CheckIn | null> {
		const startOfDay = dayjs(date).startOf("day").toDate()
		const endOfDay = dayjs(date).endOf("day").toDate()

		const checkIn = await prisma.checkIn.findFirst({
			where: {
				user_id: userId,
				created_at: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
		})

		if (!checkIn) return null

		return {
			id: checkIn.id,
			createdAt: checkIn.created_at,
			validatedAt: checkIn.validated_at,
			userId: checkIn.user_id,
			gymId: checkIn.gym_id,
		}
	}
}
