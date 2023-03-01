/** @module Models/User */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";

import {IPHistory} from "./ip_history";

/**
 *  Class representing user table
 */
@Entity({name: "users"})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 100,
		type: "varchar"
	})
	username!: string;

	@Column('text')
	email!: string;

	// IPHistory
	@OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips!: Relation<IPHistory[]>;

	@CreateDateColumn()
	created_at!: string;

	@UpdateDateColumn()
	updated_at!: string;

	@DeleteDateColumn()
	deleted_at?: string;
}
