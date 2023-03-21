/** @module Models/Category */

import TypeORM from "typeorm";
import {Pin} from "./pin";

/**
 *  Class representing category table
 */
@TypeORM.Entity({name: "categories"})
export class Category extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id!: number;

	@TypeORM.Column({
		length: 50,
		type: "varchar"
	})
	category!: string;

	// Pins
	@TypeORM.OneToMany((type) => Pin, (pin: Pin) => pin.category)
	pins?: TypeORM.Relation<Pin[]>;

	@TypeORM.CreateDateColumn({select: false})
	created_at!: string;

	@TypeORM.UpdateDateColumn({select: false})
	updated_at!: string;

	@TypeORM.DeleteDateColumn({select: false})
	deleted_at?: string;
}
