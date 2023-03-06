/** @module Models/Company */
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
 *  Class representing Company table
 */
@Entity({name: "companies"})
export class Company extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 50,
		type: "varchar"
	})
	company!: string;

	// Pins
	@OneToMany((type) => Pin, (pin: Pin) => pin.company)
	pins?: Relation<Pin[]>;

	@CreateDateColumn({select: false})
	created_at!: string;

	@UpdateDateColumn({select: false})
	updated_at!: string;

	@DeleteDateColumn({select: false})
	deleted_at?: string;
}
