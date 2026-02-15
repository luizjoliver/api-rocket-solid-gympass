import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import { GetUserCheckInsHistoryUseCase } from "../getUserCheckInsHistory.js"

export function makeGetUserCheckInsHistoryUseCase() {
	const prismaRepository = new PrismaCheckInRepository()
	const getUserCheckInsHistoryUseCase = new GetUserCheckInsHistoryUseCase(
		prismaRepository,
	)

	return getUserCheckInsHistoryUseCase
}
