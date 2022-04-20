import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCreatedAtUpdatedAt1650455638441 implements MigrationInterface {
    name = 'ChangeCreatedAtUpdatedAt1650455638441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "updatedAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "createdAt" character varying NOT NULL`);
    }

}
