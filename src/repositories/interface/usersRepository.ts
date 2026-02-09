import type { User } from "@/models/User.js"

export interface UsersRepository {
	create(data: User): Promise<User>
	findByEmail(email: string): Promise<User | null>
	findById(userId: string): Promise<User | null>
}
