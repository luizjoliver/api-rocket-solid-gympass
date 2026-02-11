import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import {
	type SearchGymQuery,
	searchGymQuerySchema,
} from "@/routes/gyms/schemas/searchSchema.js"
import { SearchGymUseCase } from "@/use-cases/gym/search.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function SearchGymController(
	req: FastifyRequest<{
		Querystring: SearchGymQuery
	}>,
	reply: FastifyReply,
) {
	const { query, page } = searchGymQuerySchema.parse(req.query)

	try {
		const gymRepository = new PrismaGymRepository()
		const searchGymUseCase = new SearchGymUseCase(gymRepository)

		const { gyms } = await searchGymUseCase.execute({
			query,
			page,
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
