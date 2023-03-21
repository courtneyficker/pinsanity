/** @module SeedManager */
import {UserSeed} from "./user_seeder";
import {IPHistorySeed} from "./ip_history_seeder";
import {Seeder} from "../../lib/seed_manager";
import { PinSeed } from "./pin_seeder";
import { ListSeed } from "./list_seeder";
import { MinioSeed } from "./minio_seeder";

export type SeederOptionsType = {
	seeds: Array<Seeder>;
}

/**
 * Options bag for configuring which seeds to run during `pnpm seed`
 */
const SeederOptions: any = {
	seeds: [
		UserSeed,
		IPHistorySeed,
		// These are now obsolete! Will delete, but I'm a-scared right now
		// CategorySeed,
		// CompanySeed,
		// TypeSeed,
		PinSeed,
		ListSeed,
		MinioSeed,
	]
};

export default SeederOptions;
