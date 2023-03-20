/** @module Models/List */
import TypeORM from "typeorm";

import { Pin } from "./pin";
import { User } from "./user";

/**
 *  Class representing a user's lists
 */
@TypeORM.Entity({name: "lists"})
export class List extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id!: number;

	@TypeORM.Column({
		length: 50,
		type: "varchar"
	})
	listname!: string;

    @TypeORM.Column({
        default: true,
    })
    isPrivate!: boolean;

    // User
    @TypeORM.ManyToOne((type) => User, (user: User) => user.lists, {
        cascade: true,			// Create user if new
		onDelete: "CASCADE",	// Delete a user's lists if user deleted
    })
    user: TypeORM.Relation<User>;

    // Pins
    @TypeORM.ManyToMany(() => Pin, (pin) => pin.lists, {
        cascade: true,
    })
    @TypeORM.JoinTable()
    pins?: Pin[]

	@TypeORM.CreateDateColumn({select: false})
	created_at!: string;

	@TypeORM.UpdateDateColumn({select: false})
	updated_at!: string;

	@TypeORM.DeleteDateColumn({select: false})
	deleted_at?: string;
}
