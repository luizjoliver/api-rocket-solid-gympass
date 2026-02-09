import type { User } from "@/models/User.js"
import { randomUUID } from "node:crypto"
import type { UsersRepository } from "../interface/usersRepository.js"

export class InMemoryUsersRepository implements UsersRepository {
	private items: User[] = []

	async create(data: User): Promise<User> {
		const user = {
			id: randomUUID(),
			email: data.email,
			name: data.name,
			password_hash: data.password_hash,
			created_at: new Date(),
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

	async findById(userId: string): Promise<User | null> {
		const user = this.items.find((user) => user.id === userId)

		if (!user) return null

		return user
	}
}
