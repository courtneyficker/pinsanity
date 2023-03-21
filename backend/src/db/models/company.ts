/** @module Models/Company */

import TypeORM from "typeorm";
import {Pin} from "./pin";

/**
 *  Class representing Company table
 */
@TypeORM.Entity({name: "companies"})
export class Company extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id!: number;

	@TypeORM.Column({
		length: 50,
		type: "varchar"
	})
	company!: string;

	// Pins
	@TypeORM.OneToMany((type) => Pin, (pin: Pin) => pin.company)
	pins?: TypeORM.Relation<Pin[]>;

	@TypeORM.CreateDateColumn({select: false})
	created_at!: string;

	@TypeORM.UpdateDateColumn({select: false})
	updated_at!: string;

	@TypeORM.DeleteDateColumn({select: false})
	deleted_at?: string;
}
