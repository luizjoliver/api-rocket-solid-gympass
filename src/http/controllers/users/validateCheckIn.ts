import type { ValidateCheckInParams } from "@/http/routes/checkins/schemas/validateCheckInSchema.js"
import { LateCheckInValidationError } from "@/use-cases/users/errors/index.js"
import { makeValidateCheckInUseCase } from "@/use-cases/users/factories/makeValidateCheckInUseCase.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function validateCheckInController(
	req: FastifyRequest<{ Params: ValidateCheckInParams }>,
	reply: FastifyReply,
) {
	const { checkInId } = req.params

	try {
		const validateCheckInUseCase = makeValidateCheckInUseCase()
		const checkIn = await validateCheckInUseCase.execute({
			checkInId,
		})

		return reply.status(200).send(checkIn)
	} catch (error) {
		if (error instanceof LateCheckInValidationError)
			return reply.status(400).send({ message: error.message })

		throw error
	}
}
