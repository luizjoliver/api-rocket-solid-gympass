import type { CheckIn } from "@/models/CheckIn.js"
import { prisma } from "@/utils/db/prisma.js"
import dayjs from "dayjs"
import type { CheckInRepository } from "../interface/checkInsRepository.js"

export class PrismaCheckInRepository implements CheckInRepository {
	async findManyByUserId(userId: string, page: number = 1): Promise<CheckIn[]> {
		const checkIns = await prisma.checkIn.findMany({
			where: {
				user_id: userId,
			},
			orderBy: {
				created_at: "desc", // histórico mais recente primeiro
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return checkIns.map((checkIn) => ({
			id: checkIn.id,
			userId: checkIn.user_id,
			gymId: checkIn.gym_id,
			createdAt: checkIn.created_at,
		}))
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

	async countByUserId(userId: string): Promise<number> {
		const count = await prisma.checkIn.count({
			where: {
				user_id: userId,
			},
		})

		return count
	}
}
