import type { CheckIn } from "@/models/CheckIn.js"

export interface CheckInRepository {
	create(data: { userId: string; gymId: string }): Promise<CheckIn>
	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
	findManyByUserId(userId: string, page?: number): Promise<CheckIn[]>
}
