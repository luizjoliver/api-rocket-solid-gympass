import type { User } from "@/models/User.js"
import type { UsersRepository } from "@/repositories/interface/usersRepository.js"

interface GetUserProfileUseCaseResponse {
	user: User
}
interface GetUserProfileUseCaseRequest {
	userId: string
}
export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId)

		if (!user) throw new Error("Recurso não encontrado")

		return { user }
	}
}
