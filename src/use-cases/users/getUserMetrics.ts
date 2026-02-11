import type { CheckInRepository } from "@/repositories/interface/checkInsRepository.js"

interface GetUserMetricsRequest {
	userId: string
}

interface GetUserMetricsResponse {
	checkInsCount: number
}

export class GetUserMetricsUseCase {
	constructor(private checkInRepository: CheckInRepository) {}

	async execute({
		userId,
	}: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
		const checkInsNumber = await this.checkInRepository.countByUserId(userId)

		return { checkInsCount: checkInsNumber }
	}
}
