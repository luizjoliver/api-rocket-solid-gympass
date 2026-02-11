import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInRepository.js"
import { InMemoryGymRepository } from "@/repositories/inMemory/inMemoryGymRepository.js"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { CheckInUseCase } from "./checkIn.js"
import { MaxDistanceError } from "./errors/index.js"

let checkInsRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe("Check-in Use Case", () => {
	const gymId = "gym-01"

	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymRepository = new InMemoryGymRepository()
		sut = new CheckInUseCase(checkInsRepository, gymRepository)

		gymRepository.items.push({
			id: gymId,
			latitude: 40.6892,
			longitude: -74.0445,
			title: "Academia javaScript",
			description: "",
		})

		await gymRepository.create({
			id: gymId,
			latitude: 40.6892,
			longitude: -74.0445,
			title: "Academia javaScript",
			description: "",
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("should be able to check in", async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0))

		const { checkIn } = await sut.execute({
			gymId,
			userId: "user-01",
			userLatitude: 40.6892,
			userLongitude: -74.0445,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it("should not be able to check in twice in the same day", async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0))

		await sut.execute({
			gymId,
			userId: "user-01",
			userLatitude: 40.6892,
			userLongitude: -74.0445,
		})

		vi.setSystemTime(new Date(2022, 0, 21, 0, 0, 0))

		const { checkIn } = await sut.execute({
			gymId,
			userId: "user-01",
			userLatitude: 40.6892,
			userLongitude: -74.0445,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it("It should not be possible to check in from more than 100 meters away", async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0))

		gymRepository.items.push({
			id: "gym-02",
			latitude: -23.5505,
			longitude: -46.6333,
			title: "Academia javaScript",
			description: "",
		})

		await expect(
			sut.execute({
				gymId: "gym-02",
				userId: "user-01",
				userLatitude: -23.5525,
				userLongitude: -46.6333,
			}),
		).rejects.toBeInstanceOf(MaxDistanceError)
	})
})
