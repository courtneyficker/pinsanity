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

import { 
	IPostUsersBody,
	post_users_opts,
	IPostUsersResponse,
	IDeleteUsersBody,
	delete_users_opts,
	IDeleteUsersResponse,
} from "./types";
import { FindOptionsUtils } from "typeorm";

/*
 * Routes implemented so far:
 * /			:	GET /
 * users		:	GET /users, GET /user:id, DELETE /user, POST /user
 * categories	:	GET /categories, GET /category:id
 * companies	:	GET /companies
 * types		:	GET /types
 */

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

	// *** USERS *** //

	/**
	 * Route serving login form.
	 * @name get/users
	 * @function
	 */
	app.get("/users", async (req, reply) => {
		let users = await app.db.user.find();
		reply.send(users);
	});

	app.get("/user/:id", async(req: any, reply) => {
		let userID = req.params.id;
		let user = await User.findOneByOrFail({ id: userID });

		await reply.send(JSON.stringify({ user }));
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

	/**
	 * Route allowing deletion of a user.
	 * @name delete/user
	 * @function
	 * @param {number} userID - ID of user in User table
	 * @returns {IDeleteUsersResponse} user
	 */
	app.delete<{
		Body: IDeleteUsersBody,
		Reply: IDeleteUsersResponse,
	}>("/user", delete_users_opts, async (req, reply: FastifyReply) => {
		const id = req.body.userID;
		console.log('Deleting user %d', id);
		try {
			const myUser = await app.db.user.findOneByOrFail({ id: id });

			let res = await myUser.softRemove();

			//manually JSON stringify due to fastify bug with validation
			// https://github.com/fastify/fastify/issues/4017
			await reply.send(JSON.stringify(res));
		}
		catch {
			await reply.status(404).send(`User ${id} not found.`)
		}
	});


	// *** CATEGORIES *** //

	/**
	 * Route to retrieve list of all categories
	 * @name get/categories
	 * @function
	 */
	app.get("/categories", async (req, reply: FastifyReply) => {
		let categories = await app.db.category.find();
		reply.send(categories);
	});

	/**
	 * Route to retrieve all pins in a category
	 * @name get/category
	 * @function
	 * @param {number} catID - ID of selected category
	 * @returns { Pin[] } List of pins
	 */
	app.get("/category/:catID", async (req: any, reply: FastifyReply) => {
		const categoryID = req.params.categoryID;
		console.log("Category ID:", categoryID);

		const pins = await Pin.find({
			select: {
				name: true,
				info: true,
				releaseDate: true,
				created_at: false,
				updated_at: false,
			},
			relations: {
				// Why doesn't this work???
				// category: {
				// 	id: false,
				// 	category: true,
				// },
				category: true,
				company: false,
				type: false,
			},
			where: {
				category: {
					id: categoryID,
				}
			}
		});

		reply.send(pins);
	});


	// *** COMPANIES *** //

	/**
		 * Route to retrieve Company info
		 * @name get/companies
		 * @function
		 */
	app.get("/companies", async (req, reply: FastifyReply) => {
		let companies = await app.db.company.find();
		reply.send(companies);
	});

	/**
	 * Route to retrieve all pins from a particular company
	 * @name get/company
	 * @function
	 * @param {number} comID - ID of selected company
	 * @returns { Pin[] } List of pins
	 */
	app.get("/company/:comID", async (req: any, reply: FastifyReply) => {
		const companyID = req.params.comID;
		console.log("Company ID:", companyID);

		const pins = await Pin.find({
			select: {
				name: true,
				info: true,
				releaseDate: true,
				created_at: false,
				updated_at: false,
			},
			relations: {
				category: false,
				company: true,
				type: false,
			},
			where: {
				company: {
					id: companyID,
				}
			}
		});

		reply.send(pins);
	});



	// *** TYPES *** //

	/**
		 * Route to retrieve Type info
		 * @name get/types
		 * @function
		 */
	app.get("/types", async (req, reply: FastifyReply) => {
		let types = await app.db.type.find();
		reply.send(types);
	});

	/**
	 * Route to retrieve all pins of a particular type
	 * @name get/type
	 * @function
	 * @param {number} typeID - ID of selected company
	 * @returns { Pin[] } List of pins
	 */
	app.get("/type/:typeID", async (req: any, reply: FastifyReply) => {
		const typeID = req.params.typeID;
		console.log("Type ID:", typeID);

		const pins = await Pin.find({
			select: {
				name: true,
				info: true,
				releaseDate: true,
				created_at: false,
				updated_at: false,
			},
			relations: {
				category: false,
				company: false,
				type: true,
			},
			where: {
				type: {
					id: typeID,
				}
			}
		});

		reply.send(pins);
	});

}
