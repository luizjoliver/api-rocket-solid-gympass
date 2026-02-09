import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsersRepository.js"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"
import { GetUserProfileUseCase } from "./getUserProfile.js"

let usersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

beforeEach(() => {
	usersRepository = new InMemoryUsersRepository()
	getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
})

describe("Get User Profile use Case", () => {
	it("should be able to get user Profile", async () => {
		const password = "123456789"
		const passwordHashed = await hash(password, 6)

		const createdUser = await usersRepository.create({
			email: "teste@gmail.com",
			name: "teste",
			password_hash: passwordHashed,
		})

		const { user } = await getUserProfileUseCase.execute({
			userId: createdUser.id as string,
		})

		expect(user.id).toEqual(expect.any(String))
		expect(user.name).toEqual("teste")
	})

	it("should not be able to get user Profile with wrongId", async () => {
		const password = "123456789"
		const passwordHashed = await hash(password, 6)

		await usersRepository.create({
			email: "teste@gmail.com",
			name: "teste",
			password_hash: passwordHashed,
		})

		await expect(
			getUserProfileUseCase.execute({
				userId: "notExistingId",
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
