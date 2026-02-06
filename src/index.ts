import fastify from "fastify";
import { env } from "./utils/env/index.js";

const app = fastify();

app
	.listen({
		port: env.PORT,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log(`Servidor rodando na porta ${env.PORT}`);
	});
