/** @module Seeds/Category */

import { Category } from "../models/category";
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";

import { faker } from "@faker-js/faker";
faker.seed(100);

/**
 * CategorySeeder class - Model class for interacting with "categories" table
 */
export class CategorySeeder extends Seeder {
	/**
	 * Runs the Category table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Categories...");
		// clear out whatever's already there
		// note we cannot use .clear() because postgres cascade is bugged in Typeorm
		// https://github.com/typeorm/typeorm/issues/1649
		await app.db.category.delete({});

		for (let i = 1; i < 6; i++) {
			let cat = new Category();
			cat.category = faker.lorem.word() + " Category";

			await cat.save();
			app.log.info("Seeded category " + i);
		}
	}
}

// generate default instance for convenience
export const CategorySeed = new CategorySeeder();
