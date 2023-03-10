/** @module Seeds/User */
import {User} from "../models/user";
import {Seeder} from "../../lib/seed_manager";
import {FastifyInstance} from "fastify";

/**
 * UserSeeder class - Model class for interacting with "users" table
 */
export class UserSeeder extends Seeder {
	/**
	 * Runs the User table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Users...");
		// clear out whatever's already there
		// note we cannot use .clear() because postgres cascade is bugged in Typeorm
		// https://github.com/typeorm/typeorm/issues/1649
		await app.db.user.delete({});

		for (let i = 1; i < 11; i++) {
			let user = new User();
			user.username = "user" + i;
			user.email = "user" + i + "@email.com";
			await user.save();
			app.log.info("Seeded user " + i);
		}
	}
}

// generate default instance for convenience
export const UserSeed = new UserSeeder();

