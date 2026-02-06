import fastify from "fastify"
import { prisma } from "./utils/db/prisma.js"
import { env } from "./utils/env/index.js"

const app = fastify()

app.get("/listar", async () => {
	const users = await prisma.user.findMany({})

	return { users }
})

app
	.listen({
		port: env.PORT,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log(`Servidor rodando na porta ${env.PORT}`)
	})
