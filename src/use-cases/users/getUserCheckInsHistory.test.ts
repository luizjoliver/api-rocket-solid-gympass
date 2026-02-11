import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInRepository.js"
import { beforeEach, describe, expect, it } from "vitest"
import { GetUserCheckInsHistoryUseCase } from "./getUserCheckInsHistory.js"

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserCheckInsHistoryUseCase

describe("Get User Check-ins History Use Case", () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new GetUserCheckInsHistoryUseCase(checkInsRepository)
	})

	it("should be able to fetch user check-ins history", async () => {
		const USER_ID = "user-01"
		await checkInsRepository.create({
			gymId: "gym-01",
			userId: USER_ID,
		})

		await checkInsRepository.create({
			gymId: "gym-02",
			userId: USER_ID,
		})

		const { checkIns } = await sut.execute({
			userId: USER_ID,
		})

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gymId: "gym-01" }),
			expect.objectContaining({ gymId: "gym-02" }),
		])
	})

	it("should be able to fetch paginated user check-ins history", async () => {
		const USER_ID = "user-01"

		for (let i = 1; i <= 22; i++) {
			await checkInsRepository.create({
				gymId: `gym-${i}`,
				userId: USER_ID,
			})
		}

		const { checkIns } = await sut.execute({
			userId: USER_ID,
            page:2
		})

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gymId: "gym-21" }),
			expect.objectContaining({ gymId: "gym-22" }),
		])
	})
})
