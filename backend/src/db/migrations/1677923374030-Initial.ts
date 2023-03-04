import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1677923374030 implements MigrationInterface {
    name = 'Initial1677923374030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ip_history" ("id" SERIAL NOT NULL, "ip" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "PK_497e0092c5d0220149e17a0483a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "email" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ip_history" ADD CONSTRAINT "FK_b3658d04b80507751b273bf038b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ip_history" DROP CONSTRAINT "FK_b3658d04b80507751b273bf038b"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "ip_history"`);
    }

}
