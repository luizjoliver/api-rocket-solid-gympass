import {
	type SearchNearbyGymQuery,
	searchNearbyGymQuerySchema,
} from "@/routes/gyms/schemas/searchyNearbySchema.js"
import { makeSearchGymNearbyUseCase } from "@/use-cases/users/factories/makeSearchNearbyGymUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function SearchNearbyGymController(
	req: FastifyRequest<{
		Querystring: SearchNearbyGymQuery
	}>,
	reply: FastifyReply,
) {
	const { latitude, longitude } = searchNearbyGymQuerySchema.parse(req.query)

	try {
		const searchNearbyGymUseCase = makeSearchGymNearbyUseCase()

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
