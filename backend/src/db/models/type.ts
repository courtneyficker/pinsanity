/** @module Models/Type */
import TypeORM from "typeorm";
import {Pin} from "./pin";

/**
 *  Class representing type table
 */
@TypeORM.Entity({name: "types"})
export class Type extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id!: number;

	@TypeORM.Column({
		length: 50,
		type: "varchar"
	})
	type!: string;

	// Pins
	@TypeORM.OneToMany((type) => Pin, (pin: Pin) => pin.type)
	pins?: TypeORM.Relation<Pin[]>;

	@TypeORM.CreateDateColumn({select: false})
	created_at!: string;

	@TypeORM.UpdateDateColumn({select: false})
	updated_at!: string;

	@TypeORM.DeleteDateColumn({select: false})
	deleted_at?: string;
}
