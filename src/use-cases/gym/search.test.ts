import { InMemoryGymRepository } from "@/repositories/inMemory/inMemoryGymRepository.js"
import { beforeEach, describe, expect, it } from "vitest"
import { SearchGymUseCase } from "./search.js"

let gymRepository: InMemoryGymRepository
let sut: SearchGymUseCase

describe("Search Gym Use Case", () => {
	beforeEach(async () => {
		gymRepository = new InMemoryGymRepository()
		sut = new SearchGymUseCase(gymRepository)
	})

	it("should be able to search for gyms", async () => {
		await gymRepository.create({
			title: "javascript gym",
			description: "Descrição",
			phone: "619999",
			latitude: 40.6892,
			longitude: -74.04453,
		})

		await gymRepository.create({
			title: "typescript gym",
			description: "Descrição",
			phone: "619999",
			latitude: 40.6892,
			longitude: -74.04453,
		})

		const { gyms } = await sut.execute({ query: "javascript", page: 1 })

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: "javascript gym" })])
	})

	it("should be able to fetch paginated gym search", async () => {
		for (let i = 1; i <= 22; i++) {
			await gymRepository.create({
				title: `javascript gym ${i}`,
				description: null,
				phone: null,
				latitude: 40.6892,
				longitude: -74.04453,
			})
		}

		const { gyms } = await sut.execute({
			query: "JavaScript",
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: `javascript gym 21` }),
			expect.objectContaining({ title: `javascript gym 22` }),
		])
	})
})
