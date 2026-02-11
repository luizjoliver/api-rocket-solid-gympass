import type { CheckIn } from "@/models/CheckIn.js"
import type { CheckInRepository } from "@/repositories/interface/checkInsRepository.js"

interface GetUserCheckInsHistorUseCaseRequest {
	userId: string
	page?: number
}

interface GetUserCheckInsHistorUseCaseResponse {
	checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryUseCase {
	constructor(private checkInRepository: CheckInRepository) {}

	async execute({
		userId,
		page,
	}: GetUserCheckInsHistorUseCaseRequest): Promise<GetUserCheckInsHistorUseCaseResponse> {
		const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

		return { checkIns }
	}
}
