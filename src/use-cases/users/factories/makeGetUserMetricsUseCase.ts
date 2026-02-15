import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import { GetUserMetricsUseCase } from "../getUserMetrics.js"

export function makeGetUserMetricsUseCase() {
	const prismaRepository = new PrismaCheckInRepository()
	const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaRepository)

	return getUserMetricsUseCase
}
