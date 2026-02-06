import fastifyCors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastify from "fastify"
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { Routes } from "./routes/index.js"
import { env } from "./utils/env/index.js"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "gym pass API",
			version: "1.0",
		},
	},
})
app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
})
app.register(fastifyCors, {
	origin: "*",
	methods: ["post", "get", "put", "delete", "patch"],
})

app.register(Routes)

app
	.listen({
		port: env.PORT,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log(`Servidor rodando na porta ${env.PORT}`)
	})
