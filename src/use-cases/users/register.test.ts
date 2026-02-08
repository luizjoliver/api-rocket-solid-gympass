import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsersRepository.js"
import { compare } from "bcryptjs"
import { describe, expect, it } from "vitest"
import { userAlreadyExistsError } from "./errors/index.js"
import { RegisterUsersUseCase } from "./register-user.js"

describe("Register User Tests", async () => {
	it("should be able to register user", async () => {
		const inMemoryUsersRepository = new InMemoryUsersRepository()
		const registerUserUseCase = new RegisterUsersUseCase(
			inMemoryUsersRepository,
		)

		const { user } = await registerUserUseCase.execute({
			name: "Luiz Doe",
			email: "LuizDoe@gmail.com",
			password: "123456789",
		})

		expect(user).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: "Luiz Doe",
				email: "LuizDoe@gmail.com",
				password_hash: expect.any(String),
				created_at: expect.any(Date),
			}),
		)
	})

	it("should hash user password when registering him", async () => {
		const inMemoryUsersRepository = new InMemoryUsersRepository()
		const registerUserUseCase = new RegisterUsersUseCase(
			inMemoryUsersRepository,
		)
		const userPassword = "123456789"
		const { user } = await registerUserUseCase.execute({
			name: "Jhon Doe",
			email: "JhonDoe@gmail.com",
			password: userPassword,
		})

		const isPasswordCorrectlyHashed = await compare(
			userPassword,
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it("should not be able to register the same email twice", async () => {
		const inMemoryUsersRepository = new InMemoryUsersRepository()
		const registerUserUseCase = new RegisterUsersUseCase(
			inMemoryUsersRepository,
		)
		const email = "JhonDoe2@gmail.com"
		await registerUserUseCase.execute({
			name: "Jhon Doe2",
			email: email,
			password: "123456789",
		})

		await expect(
			registerUserUseCase.execute({
				name: "Jhon Doe3",
				email: email,
				password: "1234567891",
			}),
		).rejects.toBeInstanceOf(userAlreadyExistsError)
	})
})
