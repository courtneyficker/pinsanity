/** @module Models/List */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";

import { Pin } from "./pin";
import { User } from "./user";

/**
 *  Class representing a user's lists
 */
@Entity({name: "lists"})
export class List extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 50,
		type: "varchar"
	})
	listname!: string;

    // User
    @ManyToOne((type) => User, (user: User) => user.lists, {
        cascade: true,			// Create type if new
		onDelete: "CASCADE",	// Delete a pin's type if pin deleted
    })
    user: Relation<User>;

    // Pins
    @ManyToMany(() => Pin)
    @JoinTable()
    pins: Pin[]

	@CreateDateColumn({select: false})
	created_at!: string;

	@UpdateDateColumn({select: false})
	updated_at!: string;

	@DeleteDateColumn({select: false})
	deleted_at?: string;
}
