/** @module Routes */
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { User } from "./db/models/user";
import { IPHistory } from "./db/models/ip_history";
import { Category } from "./db/models/category";
import { Company } from "./db/models/company";
import { Type } from "./db/models/type";
import { Pin } from "./db/models/pin";

import { IPostUsersBody, post_users_opts, IPostUsersResponse } from "./types";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */
export async function pinsanity_routes(app: FastifyInstance): Promise<void> {

	// Middleware
	// TODO: Refactor this in favor of fastify-cors
	app.use(cors());

	/**
	 * Route replying to /test path for test-testing
	 * @name get/test
	 * @function
	 */
	app.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
		reply.send("GET Test");
	});

	/**
	 * Main home page
	 * @name get/
	 * @function
	 */
	app.get("/", async (req, reply) => {

		const indexFile = await fs.readFile(path.resolve(__dirname, '..', 'public', 'index.html'))
			.catch(err => {
				console.error(err);
				//send error result - 500!
				reply.header('Content-Type', 'text/html');
				reply.status(500).send(err);
			});
			console.log(indexFile);
	
		reply.header('Content-type', 'text/html');
		reply.status(200).send(indexFile);
	});

	/**
	 * Route serving login form.
	 * @name get/users
	 * @function
	 */
	app.get("/users", async (req, reply) => {
		let users = await app.db.user.find();
		reply.send(users);
	});

	/**
	 * Route allowing creation of a new user.
	 * @name post/users
	 * @function
	 * @param {string} name - user's full name
	 * @param {string} email - user's email address
	 * @returns {IPostUsersResponse} user and IP Address used to create account
	 */
	app.post<{
		Body: IPostUsersBody,
		Reply: IPostUsersResponse
	}>("/users", post_users_opts, async (req, reply: FastifyReply) => {

		const {name, email} = req.body;

		const user = new User();
		user.username = name;
		user.email = email;

		const ip = new IPHistory();
		ip.ip = req.ip;
		ip.user = user;
		// transactional, transitively saves user to users table as well IFF both succeed
		await ip.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify({user, ip_address: ip.ip}));
	});

}
