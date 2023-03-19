import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import VerifyPayloadType from "fastify-auth0-verify";
import fp from "fastify-plugin";


declare module 'fastify' {
	interface FastifyRequest {
		// You can easily find the type of this return using intellisense inferral below
		jwtVerify(): Promise<typeof VerifyPayloadType>
	}
	interface FastifyInstance {
		auth(): void,
	}
}

export const AuthPlugin = fp(async function(fastify: FastifyInstance, opts: FastifyPluginOptions) {
	fastify.register(import('fastify-auth0-verify'), {
		domain: import.meta.env["VITE_AUTH_DOMAIN"],
  		secret: import.meta.env["VITE_AUTH_SECRET"],
	});

	fastify.decorate("auth", async function(request: FastifyRequest, reply: FastifyReply) {
		try {
			// This is the thing we added in our interface above
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});
});