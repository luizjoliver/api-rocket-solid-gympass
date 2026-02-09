import type { User } from "@/models/User.js"
import type { UsersRepository } from "@/repositories/interface/usersRepository.js"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/index.js"

interface RegisterUserServiceRequest {
	password: string
	email: string
	name: string
}

interface RegisterUserReponse {
	user: User
}

export class RegisterUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		password,
		email,
		name,
	}: RegisterUserServiceRequest): Promise<RegisterUserReponse> {
		const password_hash = await hash(password, 6)

		const userAlreadyExists = await this.usersRepository.findByEmail(email)

		if (userAlreadyExists) throw new UserAlreadyExistsError()

		const user = await this.usersRepository.create({
			email,
			name,
			password_hash,
		})

		return { user }
	}
}
