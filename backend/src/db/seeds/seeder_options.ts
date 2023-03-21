/** @module SeedManager */
import {UserSeed} from "./user_seeder";
import {IPHistorySeed} from "./ip_history_seeder";
import {Seeder} from "../../lib/seed_manager";
import { CategorySeed } from "./category_seeder";
import { CompanySeed } from "./company_seeder";
import { TypeSeed } from "./type_seeder";
import { PinSeed } from "./pin_seeder";
import { ListSeed } from "./list_seeder";

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
		// CategorySeed,
		// CompanySeed,
		// TypeSeed,
		PinSeed,
		ListSeed,
	]
};

export default SeederOptions;
