

import type { CreateCheckInBody } from "@/routes/users/schemas/createCheckInSchema.js"
import { UserAlreadyExistsError } from "@/use-cases/users/errors/index.js"
import { makeCheckInUseCase } from "@/use-cases/users/factories/makeCheckInUseCase.js"
import { makeValidateCheckInUseCase } from "@/use-cases/users/factories/makeValidateCheckInUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function validateCheckInController(
    req: FastifyRequest<{ Body: CreateCheckInBody }>,
    reply: FastifyReply,
) {
    const { gymId, userId, userLatitude, userLongitude } = req.body

    try {
        const checkInUseCase = makeValidateCheckInUseCase()
        const checkIn = await checkInUseCase.execute({
           checkInId
        })

        return reply.status(201).send(checkIn)
    } catch (error) {
        if (error instanceof UserAlreadyExistsError)
            reply.status(400).send({ message: error.message })

        throw error
    }
}
