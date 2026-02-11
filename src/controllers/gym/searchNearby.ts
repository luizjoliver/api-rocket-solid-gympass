import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import {
	type SearchNearbyGymQuery,
	searchNearbyGymQuerySchema,
} from "@/routes/gyms/schemas/searchyNearbySchema.js"
import { SearchNearbyGymUseCase } from "@/use-cases/gym/searchNearbyGym.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function SearchNearbyGymController(
	req: FastifyRequest<{
		Querystring: SearchNearbyGymQuery
	}>,
	reply: FastifyReply,
) {
	const { latitude, longitude } = searchNearbyGymQuerySchema.parse(req.query)

	try {
		const gymRepository = new PrismaGymRepository()
		const searchNearbyGymUseCase = new SearchNearbyGymUseCase(gymRepository)

		const { gyms } = await searchNearbyGymUseCase.execute({
			userLatitude: latitude,
			userLongitude: longitude,
		})

		return reply.status(200).send({
			gyms,
		})
	} catch (error) {
		if (error instanceof Error) {
			return reply.status(400).send({
				message: error.message,
			})
		}

		throw error
	}
}
