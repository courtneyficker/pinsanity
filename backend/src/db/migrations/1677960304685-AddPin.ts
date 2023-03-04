import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPin1677960304685 implements MigrationInterface {
    name = 'AddPin1677960304685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pins" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "info" text NOT NULL, "releaseDate" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "categoryId" integer, "companyId" integer, "typeId" integer, CONSTRAINT "PK_a3e589ffd3c8c46861d011aede4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pins" ADD CONSTRAINT "FK_677ad341e02b4df54b41dafe959" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pins" ADD CONSTRAINT "FK_f476cfd81e35ce9dd033e49d6b3" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pins" ADD CONSTRAINT "FK_dbdcebb17f5cff3a128969f2751" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pins" DROP CONSTRAINT "FK_dbdcebb17f5cff3a128969f2751"`);
        await queryRunner.query(`ALTER TABLE "pins" DROP CONSTRAINT "FK_f476cfd81e35ce9dd033e49d6b3"`);
        await queryRunner.query(`ALTER TABLE "pins" DROP CONSTRAINT "FK_677ad341e02b4df54b41dafe959"`);
        await queryRunner.query(`DROP TABLE "pins"`);
    }

}
