import { MigrationInterface, QueryRunner } from "typeorm";

export class addImageToPins1679402051033 implements MigrationInterface {
    name = 'addImageToPins1679402051033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pins" ADD "imageFilename" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pins" DROP COLUMN "imageFilename"`);
    }

}
