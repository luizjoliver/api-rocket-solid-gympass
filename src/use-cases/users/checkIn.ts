import type { CheckIn } from "@/models/CheckIn.js"
import type { CheckInRepository } from "@/repositories/interface/checkInsRepository.js"
import type { GymRepository } from "@/repositories/interface/gymRepository.js"
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates.js"

interface CheckInUseCaseRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
		private checkInRepository: CheckInRepository,
		private gymRepository: GymRepository,
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymRepository.findById(gymId)

		if (!gym) throw new Error("Recurso não encontrado")

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{
				latitude: gym.latitude,
				longitude: gym.longitude,
			},
		)
		const MAX_DISTANCE_IN_KM = 0.1
		if (distance > MAX_DISTANCE_IN_KM) throw new Error("Não é possível fazer check-in estando a mais de 100 mestros de distancia da academia")

		const checkInSameDate = await this.checkInRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInSameDate)
			throw new Error("Não é possível criar mais de um Check-in no Dia")

		const checkIn = await this.checkInRepository.create({
			userId,
			gymId,
		})

		return { checkIn }
	}
}
