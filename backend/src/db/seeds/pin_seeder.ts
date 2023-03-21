/** @module Seeds/Pin */

import {FastifyInstance} from "fastify";

import {Seeder} from "../../lib/seed_manager";
import {Pin} from "../models/pin";
import { Category } from "../models/category";
import { Company } from "../models/company";
import { Type } from "../models/type";
import { count, pins } from "../../lib/pinfo.json";

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
		
        // Remove everything. Eventually make it so we only add what we don't already have
		await app.db.pin.delete({});
        
        // Read pin info from local json file
        /*
            "id": 1,
            "name": "Merch",
            "info": "This pin was a reward for spending $90 or more online during the 2012 holiday season. Later, it was a reward for spending $100 or more at PAX East 2013, PAX Aus 2013, and PAX Prime 2013. This pin has a 2012 and 2013 variants.",
            "Category": "PAX 13",
            "ReleaseDate": "11/27/12",
            "Company": "Penny Arcade",
            "Type": "Purchase Reward"
        */
        
        const pinData = pins as any[];

        // See how many are in the file vs how many already in DB
        // Not sure why this is being so dumb
        // const countQuery = app.db.pin
		// 	.createQueryBuilder("countQuery")
		// 	.select("COUNT(id)", "total");
		// let dbCountObj: JSON|undefined = await countQuery.getRawOne();
        // let dbCount = 0;
        // if (dbCountObj && dbCountObj.hasOwnProperty("total")){
        //     dbCount = dbCountObj.total;
        // }
        const fileCount = count;
        // console.log(`in DB: ${JSON.stringify(dbCount)} - in file: ${fileCount}`);
        //console.log(`in DB: ${dbCount} - in file: ${fileCount}`);

        const categories = await Category.find();
        const companies = await Company.find();
        const types = await Type.find();

        // Start seeding 
        for (let i = 1; i < fileCount+1; i++) {
             let pin = new Pin();
            pin.name = pins[i-1].name;
            pin.info = pins[i-1].info;
            pin.releaseDate = pins[i-1].ReleaseDate;
            pin.imageFilename = `${i}.png`;

            // Find or create linked table info
            // First, Category
            try {
                const pinCategory = await Category.findOneByOrFail({"category": pins[i-1].Category});
                pin.category = pinCategory;
            }
            catch {
                console.log(`Category ${pins[i-1].Category} does not exist! Guess we'd better create one.`);
                let newCat = new Category();
                newCat.category = pins[i-1].Category;
                await newCat.save();
                pin.category = newCat;
            }

            // Next, Company
            try {
                const pinCompany = await Company.findOneByOrFail({"company": pins[i-1].Company});
                pin.company = pinCompany;
            }
            catch {
                console.log(`Company ${pins[i-1].Company} does not exist! Guess we'd better create one.`);
                let newCom = new Company();
                newCom.company = pins[i-1].Company;
                await newCom.save();
                pin.company = newCom;
            }

            // Finally, Type
            try {
                const pinType = await Type.findOneByOrFail({"type": pins[i-1].Type});
                pin.type = pinType;
            }
            catch {
                console.log(`Type ${pins[i-1].Type} does not exist! Guess we'd better create one.`);
                let newType = new Type();
                newType.type = pins[i-1].Type;
                await newType.save();
                pin.type = newType;
            }

            // pin.category = categories[i%5];
            // pin.company = companies[i%5];
            // pin.type = types[i%5];

	        await pin.save();
	        app.log.info("Finished seeding pin " + i);
		}
	}
}

export const PinSeed = new PinSeeder();
