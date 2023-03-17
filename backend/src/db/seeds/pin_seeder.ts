/** @module Seeds/Pin */

import {FastifyInstance} from "fastify";

import {Seeder} from "../../lib/seed_manager";
import {Pin} from "../models/pin";
import { Category } from "../models/category";
import { Company } from "../models/company";
import { Type } from "../models/type";
// import { pins } from "../../lib/pinfo.json";

import {faker} from "@faker-js/faker";
faker.seed(100);

/**
 * Seeds the pin table
 */
export class PinSeeder extends Seeder {

	/**
   * Runs the Pin table's seed
   * @function
   * @param {FastifyInstance} app
   * @returns {Promise<void>}
   */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Pins...");
		// Remove everything in there currently
		await app.db.pin.delete({});
        
        /* This stuff is for later...stick with auto-generated seeding for now
        // Read pin info from local json file
        const pinData = pins as any[];
        console.log(pinData.length);
        */

        const categories = await Category.find();
        const companies = await Company.find();
        const types = await Type.find();

        for (let i = 1; i < 101; i++) {
            let pin = new Pin();
            pin.name = "Pin " + i;
            pin.info = faker.lorem.paragraph();
            pin.releaseDate = faker.date.past().toDateString();

            // Add linked table info
            pin.category = categories[i%5];
            pin.company = companies[i%5];
            pin.type = types[i%5];

	        const secondResult = await pin.save();
	        app.log.info("Finished seeding pin " + i);
		}
	}
}

export const PinSeed = new PinSeeder();
