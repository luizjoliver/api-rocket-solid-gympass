import type { CheckIn } from "@/models/CheckIn.js"

export interface CheckInRepository {
	create(data: CheckIn): Promise<CheckIn>
}
