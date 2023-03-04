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

// import {Pin} from "./pin";

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

	// // Pins
	// @OneToMany((type) => Pin, (pin: Pin) => pin.company)
	// pins?: Relation<Pin[]>;

	@CreateDateColumn()
	created_at!: string;

	@UpdateDateColumn()
	updated_at!: string;

	@DeleteDateColumn()
	deleted_at?: string;
}
