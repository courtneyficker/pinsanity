/** @module Models/User */
import TypeORM from "typeorm";
import { IPHistory } from "./ip_history";
import { List } from "./list";

/**
 *  Class representing user table
 */
@TypeORM.Entity({name: "users"})
export class User extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id!: number;

	@TypeORM.Column({
		length: 100,
		type: "varchar"
	})
	username!: string;

	@TypeORM.Column('text')
	email!: string;

	// Lists
	@TypeORM.OneToMany((type) => List, (list: List) => list.user)
	lists?: TypeORM.Relation<List[]>;

	// IPHistory
	@TypeORM.OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips!: TypeORM.Relation<IPHistory[]>;

	@TypeORM.CreateDateColumn()
	created_at!: string;

	@TypeORM.UpdateDateColumn()
	updated_at!: string;

	@TypeORM.DeleteDateColumn({select: false})
	deleted_at?: string;
}
