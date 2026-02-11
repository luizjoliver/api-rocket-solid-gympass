import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInRepository.js"
import { beforeEach, describe, expect, it } from "vitest"
import { GetUserMetricsUseCase } from "./getUserMetrics.js"

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe("Get User Metrics Use Case", () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new GetUserMetricsUseCase(checkInsRepository)
	})

	it("should be able to get check-ins count  from metrics", async () => {
		const USER_ID = "user-01"
		await checkInsRepository.create({
			gymId: "gym-01",
			userId: USER_ID,
		})

		await checkInsRepository.create({
			gymId: "gym-02",
			userId: USER_ID,
		})

		const { checkInsCount } = await sut.execute({
			userId: USER_ID,
		})

		expect(checkInsCount).toEqual(2)
	})
})
