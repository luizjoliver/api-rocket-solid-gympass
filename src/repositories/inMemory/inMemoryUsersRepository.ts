import type { User } from "@/models/User.js"
import type { UsersRepository } from "../interface/usersRepository.js"

export class InMemoryUsersRepository implements UsersRepository {
	private items: User[] = []

	async create(data: User): Promise<User> {
		const user = {
			id: `${this.items.length + 1}-user`,
			email: data.email,
			name: data.name,
			password_hash: data.password_hash,
            created_at:new Date()
		}

		this.items.push(user)
		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find((user) => user.email === email)

		if (!user) {
			return null
		}

		return user
	}
}
