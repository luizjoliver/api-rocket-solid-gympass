import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import "dotenv/config"
import fastify from "fastify"
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { Routes } from "./http/routes/index.js"

export const app = fastify().withTypeProvider<ZodTypeProvider>()

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

app.register(fastifyCookie)

app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "10m",
	},
})

app.register(Routes)
