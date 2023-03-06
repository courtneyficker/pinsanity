/** @module DatabasePlugin */
import "reflect-metadata";
import fp from "fastify-plugin";
import {DataSource, Repository} from "typeorm";
import {User} from "../db/models/user";
import {IPHistory} from "../db/models/ip_history";
import {FastifyInstance, FastifyPluginOptions} from "fastify";
import {AppDataSource} from "../db/datasources/dev_datasource";
import { Category } from "../db/models/category";
import { Company } from "../db/models/company";
import { Type } from "../db/models/type";
import { Pin } from "../db/models/pin";


/** This is AWESOME - we're telling typescript we're adding our own "thing" to base 'app', so we get FULL IDE/TS support */
declare module 'fastify' {

	interface FastifyInstance {
		db: DBConfigOpts
	}

	// interface FastifyRequest {
	// 	myPluginProp: string
	// }
	// interface FastifyReply {
	// 	myPluginProp: number
	// }
}

interface DBConfigOpts {
	connection: DataSource,
	user: Repository<User>,
	ip: Repository<IPHistory>,
	category: Repository<Category>,
	company: Repository<Company>,
	type: Repository<Type>,
	pin: Repository<Pin>,
	
}

/**
 * Connects and decorates fastify with our Database connection
 * @function
 */
const DbPlugin = fp(async (app: FastifyInstance, options: FastifyPluginOptions, done: any) => {

	const dataSourceConnection = AppDataSource;

	await dataSourceConnection.initialize();


	// this object will be accessible from any fastify server instance
	// app.status(200).send()
	// app.db.user
	app.decorate("db", {
		connection: dataSourceConnection,
		user: dataSourceConnection.getRepository(User),
		ip: dataSourceConnection.getRepository(IPHistory),
		category: dataSourceConnection.getRepository(Category),
		company: dataSourceConnection.getRepository(Company),
		type: dataSourceConnection.getRepository(Type),
		pin: dataSourceConnection.getRepository(Pin),
	});

	done();
}, {
	name: "database-plugin"
});

export default DbPlugin;
