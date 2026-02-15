import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import { PrismaGymRepository } from "@/repositories/prisma/prismaGymRepository.js"
import { CheckInUseCase } from "../checkIn.js"

export function makeCheckInUseCase() {
	const prismaRepository = new PrismaCheckInRepository()
	const gymRepository = new PrismaGymRepository()
	const checkInUseCase = new CheckInUseCase(prismaRepository, gymRepository)

	return checkInUseCase
}
