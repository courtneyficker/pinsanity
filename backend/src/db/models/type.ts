/** @module Models/Type */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";

import {Pin} from "./pin";

/**
 *  Class representing type table
 */
@Entity({name: "types"})
export class Type extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 50,
		type: "varchar"
	})
	type!: string;

	// Pins
	@OneToMany((type) => Pin, (pin: Pin) => pin.type)
	pins?: Relation<Pin[]>;

	@CreateDateColumn()
	created_at!: string;

	@UpdateDateColumn()
	updated_at!: string;

	@DeleteDateColumn()
	deleted_at?: string;
}
