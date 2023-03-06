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
import { List } from "./list";

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
        cascade: true,			// Create category if new
		onDelete: "CASCADE",	// Delete a pin's categories if pin deleted
    })
    category: Relation<Category>;
	
	// Company
    @ManyToOne((type) => Company, (company: Company) => company.pins, {
        cascade: true,			// Create company if new
		onDelete: "CASCADE",	// Delete a pin's company if pin deleted
    })
    company: Relation<Company>;

	// Type
    @ManyToOne((type) => Type, (type: Type) => type.pins, {
        cascade: true,			// Create type if new
		onDelete: "CASCADE",	// Delete a pin's type if pin deleted
    })
    type: Relation<Type>;

	// Lists featuring this pin
	@ManyToMany(() => List, (list: List) => list.pins)
    lists: List[]

	@CreateDateColumn({select: false})
	created_at!: string;

	@UpdateDateColumn({select: false})
	updated_at!: string;

	@DeleteDateColumn({select: false})
	deleted_at?: string;
}
