import type { FastifyInstanceType } from "@/types/index.js"
import { prisma } from "@/utils/db/prisma.js"
import z from "zod"

export function UsersRoutes(app: FastifyInstanceType) {
	app.post(
		"/users",
		{
			schema: {
				body: z.object({
					name: z.string(),
					email: z.email(),
					password: z
						.string()
						.min(8, { error: "A Senha deve ter no mínimo 8 caracteres" }),
				}),
			},
		},
		async (req, reply) => {
			const { email, name, password } = req.body
			const user = await prisma.user.create({
				data: {
					email,
					name,
					password_hash: password,
				},
			})

			return reply.status(201).send(user)
		},
	)
}
