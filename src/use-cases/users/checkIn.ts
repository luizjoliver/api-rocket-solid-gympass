import type { CheckIn } from "@/models/CheckIn.js"
import type { CheckInRepository } from "@/repositories/interface/checkInsRepository.js"

interface CheckInUseCaseRequest {
	userId: string
	gymId: string
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(private checkInRepository: CheckInRepository) {}

	async execute({
		userId,
		gymId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

		const checkIn = await this.checkInRepository.create({ gymId, userId })


        return {checkIn}
	}
}
