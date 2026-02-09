import type { User } from "@/models/User.js"
import type { UsersRepository } from "@/repositories/interface/usersRepository.js"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalidCredentialsError.js"

interface AuthenticateUseCaseRequest {
	email: string
	password: string
}

type AuthenticateUseCaseResponse = {
	user: User
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) throw new InvalidCredentialsError()

		const passwordMatch = await compare(password, user.password_hash)

		if (!passwordMatch) throw new InvalidCredentialsError()

		return {
			user,
		}
	}
}
