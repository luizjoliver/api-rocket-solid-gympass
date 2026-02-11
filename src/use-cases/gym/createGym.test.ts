import { InMemoryGymRepository } from "@/repositories/inMemory/inMemoryGymRepository.js"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateGymUseCase } from "./createGym.js"

let gymRepository: InMemoryGymRepository
let createGymUseCase: CreateGymUseCase

beforeEach(() => {
	gymRepository = new InMemoryGymRepository()
	createGymUseCase = new CreateGymUseCase(gymRepository)
})

describe("Create Gym use Case", async () => {
	it("should be able to create Gym", async () => {
		const { gym } = await createGymUseCase.execute({
			title: "JS Academia",
			description: "Descrição",
			phone: "619999",
			latitude: 40.6892,
			longitude: -74.04453,
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
