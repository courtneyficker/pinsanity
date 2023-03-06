/** @module Models/Category */
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
 *  Class representing category table
 */
@Entity({name: "categories"})
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 50,
		type: "varchar"
	})
	category!: string;

	// Pins
	@OneToMany((type) => Pin, (pin: Pin) => pin.category)
	pins?: Relation<Pin[]>;

	@CreateDateColumn({select: false})
	created_at!: string;

	@UpdateDateColumn({select: false})
	updated_at!: string;

	@DeleteDateColumn({select: false})
	deleted_at?: string;
}
