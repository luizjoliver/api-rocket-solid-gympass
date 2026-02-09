import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsersRepository.js"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"
import { AuthenticateUseCase } from "./authenticate.js"
import { InvalidCredentialsError } from "./errors/invalidCredentialsError.js"

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

beforeEach(() => {
	usersRepository = new InMemoryUsersRepository()
	authenticateUseCase = new AuthenticateUseCase(usersRepository)
})

describe("Authenticate use case", () => {
	it("should be able to authenticate", async () => {
		const password = "123456789"
		const passwordHashed = await hash(password, 6)

		const { email } = await usersRepository.create({
			email: "teste@gmail.com",
			name: "teste",
			password_hash: passwordHashed,
		})

		const { user } = await authenticateUseCase.execute({ email, password })

		expect(user.id).toEqual(expect.any(String))
	})

	it("should not be able to authenticate with wrong email", async () => {
		await expect(async () => {
			await authenticateUseCase.execute({
				email: "jhon@email.com",
				password: "123456789",
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it("should not be able to authenticate with wrong password", async () => {
		await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await hash("123456", 6),
		})

		await expect(
			authenticateUseCase.execute({
				email: "johndoe@example.com",
				password: "123123",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
