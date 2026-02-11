import type { Gym } from "@/models/Gym.js"
import { prisma } from "@/utils/db/prisma.js"
import { Prisma } from "generated/prisma/browser.js"
import type { GymRepository } from "../interface/gymRepository.js"

export class PrismaGymRepository implements GymRepository {
	async findById(gymId: string): Promise<Gym | null> {
		const gym = await prisma.gym.findUnique({
			where: {
				id: gymId,
			},
		})

		if (!gym) return null

		return {
			id: gym.id,
			title: gym.title,
			description: gym.description,
			phone: gym.phone,
			latitude: gym.latitude.toNumber(),
			longitude: gym.longitude.toNumber(),
		}
	}

	async create(data: Gym): Promise<Gym> {
		const gym = await prisma.gym.create({
			data: {
				title: data.title,
				latitude: new Prisma.Decimal(data.latitude),
				longitude: new Prisma.Decimal(data.longitude),

				...(data.description !== undefined && {
					description: data.description,
				}),
				...(data.phone !== undefined && {
					phone: data.phone,
				}),
			},
		})

		return {
			id: gym.id,
			title: gym.title,
			description: gym.description,
			phone: gym.phone,
			latitude: gym.latitude.toNumber(),
			longitude: gym.longitude.toNumber(),
		}
	}
}
