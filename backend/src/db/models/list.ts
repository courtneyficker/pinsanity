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

    @Column({
        default: true,
    })
    isPrivate!: boolean;

    // User
    @ManyToOne((type) => User, (user: User) => user.lists, {
        cascade: true,			// Create user if new
		onDelete: "CASCADE",	// Delete a user's lists if user deleted
    })
    user: Relation<User>;

    // Pins
    @ManyToMany(() => Pin, (pin) => pin.lists, {
        cascade: true,
    })
    @JoinTable()
    pins?: Pin[]

	@CreateDateColumn({select: false})
	created_at!: string;

	@UpdateDateColumn({select: false})
	updated_at!: string;

	@DeleteDateColumn({select: false})
	deleted_at?: string;
}
