import type { CheckIn } from "@/models/CheckIn.js"
import { prisma } from "@/utils/db/prisma.js"
import type { CheckInRepository } from "../interface/checkInsRepository.js"

export class PrismaCheckInRepository implements CheckInRepository {
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

	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {}
}
