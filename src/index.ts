import "dotenv/config"

import { app } from "./app.js"

app
	.listen({
		port: process.env.PORT ,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log(`Servidor rodando na porta ${process.env.PORT}`)
	})
