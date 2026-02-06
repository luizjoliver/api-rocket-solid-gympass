import "dotenv/config";
import z from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string(),
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("Variáveis de ambiente inválidas");
	throw new Error(
		"Erro nas variaveis de ambiente , verifique seu arquivo .env",
	);
}

export const env = _env.data;
