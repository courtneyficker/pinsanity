import { MigrationInterface, QueryRunner } from "typeorm";

export class AddList1678158045551 implements MigrationInterface {
    name = 'AddList1678158045551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lists" ("id" SERIAL NOT NULL, "listname" character varying(50) NOT NULL, "isPrivate" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lists_pins_pins" ("listsId" integer NOT NULL, "pinsId" integer NOT NULL, CONSTRAINT "PK_d7d45c04dd267999a660b61a345" PRIMARY KEY ("listsId", "pinsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5ea266577c4ff4a58977c62a32" ON "lists_pins_pins" ("listsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e75d4aad03f1da267f43bad798" ON "lists_pins_pins" ("pinsId") `);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_d13ad3f1ae1abae672c3edbef90" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists_pins_pins" ADD CONSTRAINT "FK_5ea266577c4ff4a58977c62a324" FOREIGN KEY ("listsId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lists_pins_pins" ADD CONSTRAINT "FK_e75d4aad03f1da267f43bad798d" FOREIGN KEY ("pinsId") REFERENCES "pins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists_pins_pins" DROP CONSTRAINT "FK_e75d4aad03f1da267f43bad798d"`);
        await queryRunner.query(`ALTER TABLE "lists_pins_pins" DROP CONSTRAINT "FK_5ea266577c4ff4a58977c62a324"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_d13ad3f1ae1abae672c3edbef90"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e75d4aad03f1da267f43bad798"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ea266577c4ff4a58977c62a32"`);
        await queryRunner.query(`DROP TABLE "lists_pins_pins"`);
        await queryRunner.query(`DROP TABLE "lists"`);
    }

}
