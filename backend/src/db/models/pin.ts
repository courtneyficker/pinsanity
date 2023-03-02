/** @module Models/Pin */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";
import { Category } from "./category";
import { Company } from "./company";
import { Type } from "./type";

/**
 *  Class representing pin table
 */
@Entity({name: "pins"})
export class Pin extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 100,
		type: "varchar"
	})
	name!: string;

	@Column('text')
	info?: string;

    @Column()
    releaseDate?: string;

	// Category
    @ManyToOne((type) => Category, (category: Category) => category.pins, {
        onDelete: "CASCADE",
    })
    category: Relation<Category>;
	
	// Company
    @ManyToOne((type) => Company, (company: Company) => company.pins, {
        onDelete: "CASCADE",
    })
    company: Relation<Company>;

	// Type
    @ManyToOne((type) => Type, (type: Type) => type.pins, {
        onDelete: "CASCADE",
    })
    type: Relation<Type>;

	@CreateDateColumn()
	created_at!: string;

	@UpdateDateColumn()
	updated_at!: string;

	@DeleteDateColumn()
	deleted_at?: string;
}
