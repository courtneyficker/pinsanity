import { FastifyReply, FastifyRequest } from "fastify"
import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
    interface FastifyInstance {
        googleOAuth2: OAuth2Namespace;
    }
}

const fastify = require('fastify')({ logger: { level: 'trace' } });
export const oauthPlugin = require('@fastify/oauth2');


fastify.register(oauthPlugin, {
    name: 'googleOAuth2',
    credentials: {
        client: {
            id: '<CLIENT_ID>',
            secret: '<CLIENT_SECRET>'
        },
        auth: oauthPlugin.GOOGLE_CONFIGURATION
    },
    // register a fastify url to start the redirect flow
    startRedirectPath: '/login/google',
    // google redirect here after the user login
    callbackUri: 'http://localhost:3000/login/google/callback'
})

fastify.get('/login/google/callback', async function (this: typeof fastify, request: FastifyRequest, reply: FastifyReply) {
    const { token } = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    console.log(token.access_token)

    // if later you need to refresh the token you can use
    // const { token: newToken } = await this.getNewAccessTokenUsingRefreshToken(token.refresh_token)

    reply.send({ access_token: token.access_token })
})
