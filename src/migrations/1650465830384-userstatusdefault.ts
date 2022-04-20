import {MigrationInterface, QueryRunner} from "typeorm";

export class userstatusdefault1650465830384 implements MigrationInterface {
    name = 'userstatusdefault1650465830384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userStatus" SET DEFAULT 'FREE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userStatus" DROP DEFAULT`);
    }

}
