import type { CheckIn } from "@/models/CheckIn.js"
import { prisma } from "@/utils/db/prisma.js"
import dayjs from "dayjs"
import type { CheckInRepository } from "../interface/checkInsRepository.js"

export class PrismaCheckInRepository implements CheckInRepository {
	async findManyByUserId(userId: string, page: number = 1) {
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
	async create(data: { userId: string; gymId: string }) {
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

	async findByUserIdOnDate(userId: string, date: Date) {
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

	async countByUserId(userId: string) {
		const count = await prisma.checkIn.count({
			where: {
				user_id: userId,
			},
		})

		return count
	}

	async findById(id: string) {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id,
			},
		})

		if (!checkIn) return null

		return {
			id: checkIn.id,
			userId: checkIn.user_id,
			gymId: checkIn.gym_id,
			createdAt: checkIn.created_at,
			validatedAt: checkIn.validated_at,
		}
	}

	async save(checkIn: CheckIn) {
		const updatedCheckIn = await prisma.checkIn.update({
			where: {
				id: checkIn.id as string,
			},
			data: {
				validated_at: checkIn.validatedAt as Date,
			},
		})

		return {
			id: updatedCheckIn.id,
			userId: updatedCheckIn.user_id,
			gymId: updatedCheckIn.gym_id,
			createdAt: updatedCheckIn.created_at,
			validatedAt: updatedCheckIn.validated_at,
		}
	}
}
