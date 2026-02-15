import z from "zod"

export const registerBodySchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z
		.string()
		.min(8, { error: "A Senha deve ter no mínimo 8 caracteres" }),
})

export type RegisterBody = z.infer<typeof registerBodySchema>
