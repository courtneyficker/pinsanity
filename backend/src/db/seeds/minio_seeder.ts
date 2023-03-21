/** @module Seeds/Minio */

import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";
import fs from 'fs';
import { UploadFileToMinio } from '../../lib/minio';

export class MinioSeeder extends Seeder {

	/**
     * MinioSeeder class - Seeds minio db with images
     */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Images to minio");

		const sourceDir = "./src/lib/imageSource/";

        console.log(sourceDir);

		fs.readdir(sourceDir, function(err, filenames) {
			filenames.forEach(function(filename) {
                // Limit to 100 for our sanity's sake
                if (parseInt(filename.split('.')[0]) < 100) {
                    fs.readFile(sourceDir + filename, async function(err, data) {
                        await UploadFileToMinio(filename, data);
                        console.log(`Seeded image ${filename}`);
                    });
                } else {}
			});
		});
	}
}

export const MinioSeed = new MinioSeeder();
