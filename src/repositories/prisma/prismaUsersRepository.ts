import type { User } from "@/models/User.js"
import { prisma } from "@/utils/db/prisma.js"
import type { Prisma } from "generated/prisma/browser.js"
import type { UsersRepository } from "../interface/usersRepository.js"

export class PrismaUsersRepository implements UsersRepository {
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({ data })

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		})

		return user
	}

	async findById(userId: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		})

		return user
	}
}
