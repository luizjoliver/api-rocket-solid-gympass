import type { UsersRepository } from "@/repositories/interface/usersRepository.js"
import { hash } from "bcryptjs"

interface RegisterUserServiceType {
	password: string
	email: string
	name: string
}

export class RegisterUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ password, email, name }: RegisterUserServiceType) {
		const password_hash = await hash(password, 6)

		const userAlreadyExists = await this.usersRepository.findByEmail(email)

		if (userAlreadyExists)
			throw new Error("Um Usuário com este e-mail já existe!")

		await this.usersRepository.create({ email, name, password_hash })
	}
}
