export class UserAlreadyExistsError extends Error {
	constructor() {
		super("Este E-mail já está cadastrado")
	}
}
