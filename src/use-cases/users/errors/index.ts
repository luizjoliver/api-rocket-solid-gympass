export class UserAlreadyExistsError extends Error {
	constructor() {
		super("Este E-mail já está cadastrado")
	}
}

export class MaxDistanceError extends Error {
	constructor() {
		super(
			"Não é possível fazer check-in estando a mais de 100 mestros de distancia da academia",
		)
	}
}

export class MaxNumberOfCheckIns extends Error {
	constructor() {
		super("Não é possível criar mais de um Check-in no Dia")
	}
}

export class LateCheckInValidationError extends Error {
	constructor() {
		super("O Check In pode ser validado até 20 minutos após a sua criação.")
	}
}
