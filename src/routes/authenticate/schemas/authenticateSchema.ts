import z from "zod"

export const authenticateUserBodySchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, { error: "A Senha deve ter no mínimo 8 caracteres" }),
})

export type RegisterBody = z.infer<typeof authenticateUserBodySchema>
