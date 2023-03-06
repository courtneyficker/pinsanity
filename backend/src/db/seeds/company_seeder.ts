/** @module Seeds/Company */

import { Company } from "../models/company";
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";

import { faker } from "@faker-js/faker";
faker.seed(100);

/**
 * CompanySeeder class - Model class for interacting with "companies" table
 */
export class CompanySeeder extends Seeder {
	/**
	 * Runs the Company table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Companies...");
		// clear out whatever's already there
		// note we cannot use .clear() because postgres cascade is bugged in Typeorm
		// https://github.com/typeorm/typeorm/issues/1649
		await app.db.company.delete({});

		for (let i = 1; i < 6; i++) {
			let com = new Company();
			com.company = faker.lorem.word() + " Company";

			await com.save();
			app.log.info("Seeded Company " + i);
		}
	}
}

// generate default instance for convenience
export const CompanySeed = new CompanySeeder();
