import "@fastify/jwt"
import type {
	FastifyBaseLogger,
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"

export type FastifyInstanceType = FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	FastifyBaseLogger,
	ZodTypeProvider
>

declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: {
			sub: string
		}
	}
}
