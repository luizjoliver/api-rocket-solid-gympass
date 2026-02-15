import { PrismaCheckInRepository } from "@/repositories/prisma/prismaCheckInRepository.js"
import { GetUserCheckInsHistoryUseCase } from "../getUserCheckInsHistory.js"
import { ValidateCheckInUseCase } from "../validateCheckIn.js"

export function makeValidateCheckInUseCase() {
    const prismaRepository = new PrismaCheckInRepository()
    const  validateCheckInUseCase = new ValidateCheckInUseCase(
        prismaRepository,
    )

    return validateCheckInUseCase
}
