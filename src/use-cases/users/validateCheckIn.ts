import type { CheckIn } from "@/models/CheckIn.js"
import type { CheckInRepository } from "@/repositories/interface/checkInsRepository.js"

interface ValidateCheckInUseCaseRequest {
	checkInId: string
}

interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn
}

export class ValidateCheckInUseCase {
	constructor(private checkInsRepository: CheckInRepository) {}

	async execute({
		checkInId,
	}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.findById(checkInId)

		if (!checkIn) {
			throw new Error("Recurso não encontrado")
		}

		checkIn.validatedAt = new Date()

		await this.checkInsRepository.save(checkIn)

		return {
			checkIn,
		}
	}
}
