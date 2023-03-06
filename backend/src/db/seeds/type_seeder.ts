/** @module Seeds/Type */

import { Type } from "../models/type";
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";

import { faker } from "@faker-js/faker";
faker.seed(100);

/**
 * TypeSeeder class - Model class for interacting with "types" table
 */
export class TypeSeeder extends Seeder {
	/**
	 * Runs the Type table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Types...");
		// clear out whatever's already there
		// note we cannot use .clear() because postgres cascade is bugged in Typeorm
		// https://github.com/typeorm/typeorm/issues/1649
		await app.db.type.delete({});

		for (let i = 1; i < 6; i++) {
			let typ = new Type();
			typ.type = faker.lorem.word() + " Type";

			await typ.save();
			app.log.info("Seeded Type " + i);
		}
	}
}

// generate default instance for convenience
export const TypeSeed = new TypeSeeder();
