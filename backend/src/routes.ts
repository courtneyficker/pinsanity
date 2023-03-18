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
import { List } from "./db/models/list";

// import { 
// 	IPostUsersBody,
// 	post_users_opts,
// 	IPostUsersResponse,
// 	IDeleteUsersBody,
// 	delete_users_opts,
// 	IDeleteUsersResponse,
// } from "./types";

import * as types from "./types";

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
			// console.log(indexFile);
	
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

	/**
	 * User detail (by ID)
	 * @name get/user/:id
	 * @function
	 */
	app.get("/user/:id", async(req: any, reply) => {
		let userID = req.params.id;
		let user = await User.findOneByOrFail({ id: userID });

		await reply.send(JSON.stringify({ user }));
	});

	/**
	 * User detail (by username)
	 * @name get/:username
	 * @function
	 */
	app.get("/:username", async (req:any, reply: FastifyReply) => {
		let un = req.params.username;
		let user = await User.findOneByOrFail({ username: un });

		await reply.send(JSON.stringify({ user }));
	})

	/**
	 * Get a user's PUBLIC lists
	 * @name get/:username/lists
	 * @function
	 */
	app.get("/:username/lists", async (req:any, reply: FastifyReply) => {
		let un = req.params.username;

		const lists = await app.db.list
			.createQueryBuilder("lists")
			.innerJoin('lists.user', 'user')
			.where('user.username = :username', { username: un })
			.andWhere('lists.isPrivate = false')
			.getMany();

		await reply.send(JSON.stringify(lists));
	})



	/**
	 * Route allowing creation of a new user.
	 * @name post/users
	 * @function
	 * @param {string} name - user's full name
	 * @param {string} email - user's email address
	 * @returns {IPostUsersResponse} user and IP Address used to create account
	 */
	app.post<{
		Body: types.IPostUsersBody,
		Reply: types.IPostUsersResponse
	}>("/users", types.post_users_opts, async (req, reply: FastifyReply) => {

		const {name, email} = req.body;

		const user = new User();
		user.username = name;
		user.email = email;

		const ip = new IPHistory();
		ip.ip = req.ip;
		ip.user = user;
		// transactional, transitively saves user to users table as well IFF both succeed
		await ip.save();

		// Create starter lists: collection, available, wanted
		const coll = new List();
		coll.listname = "Collection";
		coll.user = user;
		coll.isPrivate = false;
		await coll.save();

		const av = new List();
		av.listname = "Available";
		av.user = user;
		av.isPrivate = false;
		await av.save();

		const want = new List();
		want.listname = "Wanted";
		want.user = user;
		want.isPrivate = false;
		await want.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify({user, ip_address: ip.ip}));
	});

	/**
	 * Route allowing deletion of a user.
	 * @name delete/user
	 * @function
	 * @param {number} userID - ID of user in User table
	 * @returns {types.IDeleteUsersResponse} user
	 */
	app.delete<{
		Body: types.IDeleteUsersBody,
		Reply: types.IDeleteUsersResponse,
	}>("/user", types.delete_users_opts, async (req, reply: FastifyReply) => {
		const id = req.body.userID;

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

		const pins = await Pin.find({
			select: {
				name: true,
				info: true,
				releaseDate: true,
				created_at: false,
				updated_at: false,
			},
			relations: {
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


	// *** PINS *** //

	/**
		 * Route to retrieve all pins
		 * @name get/pins
		 * @function
		 */
	app.get("/pins", async (req: FastifyRequest, reply: FastifyReply) => {
		let pins = await app.db.pin.find();
		reply.send(pins);
	});

	/**
	 * Route to retrieve information about a single pin
	 * @name get/pin
	 * @function
	 * @param {number} pinID - ID of pin
	 * @returns { Pin } A pin and all related info
	 */
	app.get("/pin/:pinID", async (req: any, reply: FastifyReply) => {
		const pinID = req.params.pinID;

		const pin = await Pin.findOne({
			select: {
				id: true,
				name: true,
				info: true,
				releaseDate: true,
				created_at: false,
				updated_at: false,
			},
			relations: {
				category: true,
				company: true,
				type: true,
			},
			where: {
				id: pinID,
			}
		});

		reply.send(pin);
	});

	/**
	 * Route allowing creation of a new list.
	 * @name post/list
	 * @function
	 * @param {number} id - user's ID
	 * @param {string} name - Name for the list
	 * @returns {List} - The list just created
	 */
	app.post<{
		Body: types.IPostListBody,
		Reply: types.IPostListResponse
	}>("/list", types.post_list_opts, async (req, reply: FastifyReply) => {

		const {id, name, isPrivate } = req.body;

		let user = await User.findOneByOrFail({ id: id });

		const list = new List();
		list.listname = name;
		list.user = user;
		list.isPrivate = isPrivate;

		await list.save();
		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify(list));
	});

	/**
	 * Route to retrieve the total number of pins in the database
	 * @name get/pins/count
	 * @function
	 * @returns {number} total - Total number of pins
	 */
	app.get("/pins/count", async (req: any, reply: FastifyReply) => {

		const pinsQuery = app.db.pin
			.createQueryBuilder("pinsQuery")
			.select("COUNT(id)", "total");
		
		const result: any = await pinsQuery.getRawOne();
		
		console.log("Total pins:", result["total"]);

		reply.send(result["total"]);
	});

}
