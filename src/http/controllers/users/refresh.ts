import type { authenticateUserBody } from "@/http/routes/authenticate/schemas/authenticateSchema.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function refreshTokenController(
	req: FastifyRequest<{ Body: authenticateUserBody }>,
	reply: FastifyReply,
) {
	await req.jwtVerify({
		onlyCookie: true,
	})

	const token = await reply.jwtSign(
		{},
		{
			sign: {
				sub: req.user.sub as string,
			},
		},
	)

	const refreshToken = await reply.jwtSign(
		{},
		{
			sign: {
				sub: req.user.sub as string,
				expiresIn: "3d",
			},
		},
	)

	return reply
		.setCookie("refreshToken", refreshToken, {
			path: "/",
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			httpOnly: true,
		})
		.status(200)
		.send({
			token,
		})
}
