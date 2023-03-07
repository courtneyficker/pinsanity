/** @module Seeds/List */

import { List } from "../models/list";
import { User } from "../models/user";
import { Pin } from "../models/pin";

import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";

import { faker } from "@faker-js/faker";
faker.seed(100);

/**
 * ListSeeder class - Model class for interacting with "list" table
 */
export class ListSeeder extends Seeder {
	/**
	 * Runs the List table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Lists...");
		// clear out whatever's already there
		// note we cannot use .clear() because postgres cascade is bugged in Typeorm
		// https://github.com/typeorm/typeorm/issues/1649
		await app.db.list.delete({});

		for (let i = 1; i < 6; i++) {
			let newList = new List();
			newList.listname = "List " + i;

            // Add a user
            let users = await User.find();
            newList.user = users[i];

            // Add a couple of pins
            let pins = await Pin.find();
            newList.pins = [pins[i+10], pins[i+11]];

			await newList.save();
			app.log.info("Seeded List " + i);
		}
	}
}

// generate default instance for convenience
export const ListSeed = new ListSeeder();
