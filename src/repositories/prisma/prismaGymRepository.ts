import type { Gym } from "@/models/Gym.js"
import { prisma } from "@/utils/db/prisma.js"
import { Prisma } from "generated/prisma/browser.js"
import type {
	FindManyNearbyParams,
	GymRepository,
} from "../interface/gymRepository.js"

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

	async searchMany(query: string, page: number = 1): Promise<Gym[]> {
		const gyms = await prisma.gym.findMany({
			where: {
				title: {
					contains: query,
					mode: "insensitive",
				},
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return gyms.map((gym) => ({
			id: gym.id,
			title: gym.title,
			description: gym.description,
			phone: gym.phone,
			latitude: gym.latitude.toNumber(),
			longitude: gym.longitude.toNumber(),
		}))
	}

	async searchManyNearby({
		latitude,
		longitude,
	}: FindManyNearbyParams): Promise<Gym[]> {
		const MAX_DISTANCE_IN_KM = 10
		const gyms = await prisma.$queryRaw<Gym[]>`
		SELECT * from gyms
WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${MAX_DISTANCE_IN_KM}
		`

		return gyms
	}
}
