import {MigrationInterface, QueryRunner} from "typeorm";

export class ItemIdIncrementUserTableCreate1650461799736 implements MigrationInterface {
    name = 'ItemIdIncrementUserTableCreate1650461799736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "userStatus" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
