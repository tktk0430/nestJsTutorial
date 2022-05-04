import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCategory1651681090187 implements MigrationInterface {
    name = 'CreateCategory1651681090187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_categories_category" ("itemId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_f5125ad13291eb883608b794cb9" PRIMARY KEY ("itemId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32e0f47e48497fc3647e82c4ee" ON "item_categories_category" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cbcba68e69901ab873ec441a7b" ON "item_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "item_categories_category" ADD CONSTRAINT "FK_32e0f47e48497fc3647e82c4ee5" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_categories_category" ADD CONSTRAINT "FK_cbcba68e69901ab873ec441a7b6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_categories_category" DROP CONSTRAINT "FK_cbcba68e69901ab873ec441a7b6"`);
        await queryRunner.query(`ALTER TABLE "item_categories_category" DROP CONSTRAINT "FK_32e0f47e48497fc3647e82c4ee5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbcba68e69901ab873ec441a7b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32e0f47e48497fc3647e82c4ee"`);
        await queryRunner.query(`DROP TABLE "item_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
