/** @module Models/Pin */
import TypeORM from "typeorm";
import { Category } from "./category";
import { Company } from "./company";
import { Type } from "./type";
import { List } from "./list";

/**
 *  Class representing pin table
 */
@TypeORM.Entity({name: "pins"})
export class Pin extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id!: number;

	@TypeORM.Column({
		length: 100,
		type: "varchar"
	})
	name!: string;

	@TypeORM.Column('text')
	info?: string;

    @TypeORM.Column()
    releaseDate?: string;

	// Category
    @TypeORM.ManyToOne((type) => Category, (category: Category) => category.pins, {
        cascade: true,			// Create category if new
		onDelete: "CASCADE",	// Delete a pin's categories if pin deleted
    })
    category: TypeORM.Relation<Category>;
	
	// Company
    @TypeORM.ManyToOne((type) => Company, (company: Company) => company.pins, {
        cascade: true,			// Create company if new
		onDelete: "CASCADE",	// Delete a pin's company if pin deleted
    })
    company: TypeORM.Relation<Company>;

	// Type
    @TypeORM.ManyToOne((type) => Type, (type: Type) => type.pins, {
        cascade: true,			// Create type if new
		onDelete: "CASCADE",	// Delete a pin's type if pin deleted
    })
    type: TypeORM.Relation<Type>;

	// Lists featuring this pin
	@TypeORM.ManyToMany(() => List, (list: List) => list.pins)
    lists: List[]

	@TypeORM.CreateDateColumn({select: false})
	created_at!: string;

	@TypeORM.UpdateDateColumn({select: false})
	updated_at!: string;

	@TypeORM.DeleteDateColumn({select: false})
	deleted_at?: string;
}
