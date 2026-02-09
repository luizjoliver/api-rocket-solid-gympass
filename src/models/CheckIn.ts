export interface CheckIn {
	id?: string
	createdAt?: Date
	validatedAt?: Date | null
	userId: string
	gymId: string
}
