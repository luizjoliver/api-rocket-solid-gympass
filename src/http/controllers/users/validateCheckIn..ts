// export async function validateCheckInController(
// 	req: FastifyRequest<{ Body: CreateCheckInBody }>,
// 	reply: FastifyReply,
// ) {
// 	const { gymId, userId, userLatitude, userLongitude } = req.body

// 	try {
// 		const checkInUseCase = makeValidateCheckInUseCase()
// 		const checkIn = await checkInUseCase.execute({
// 			checkInId,
// 		})

// 		return reply.status(201).send(checkIn)
// 	} catch (error) {
// 		if (error instanceof UserAlreadyExistsError)
// 			reply.status(400).send({ message: error.message })

// 		throw error
// 	}
// }
