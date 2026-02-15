export interface User {
	id?: string
	name: string
	email: string
	password_hash?: string | undefined
	created_at?: Date | string
	CheckIns?: unknown
}
