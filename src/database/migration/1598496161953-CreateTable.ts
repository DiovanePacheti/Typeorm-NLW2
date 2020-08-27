import {MigrationInterface, QueryRunner} from "typeorm";

export default class CreateTable1598496161953 implements MigrationInterface {
    name = 'CreateTable1598496161953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connections" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "usersId" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "avatar" varchar NOT NULL, "whatsapp" varchar NOT NULL, "bio" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "class_schedule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "week_day" integer NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, "classesId" integer)`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subject" varchar NOT NULL, "cost" integer NOT NULL, "usersId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_connections" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "usersId" varchar, CONSTRAINT "FK_838f918b252946fe46a53dc5dd1" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_connections"("id", "created_at", "usersId") SELECT "id", "created_at", "usersId" FROM "connections"`);
        await queryRunner.query(`DROP TABLE "connections"`);
        await queryRunner.query(`ALTER TABLE "temporary_connections" RENAME TO "connections"`);
        await queryRunner.query(`CREATE TABLE "temporary_class_schedule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "week_day" integer NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, "classesId" integer, CONSTRAINT "FK_4a7343dd4e0841800ac55a58016" FOREIGN KEY ("classesId") REFERENCES "classes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_class_schedule"("id", "week_day", "from", "to", "classesId") SELECT "id", "week_day", "from", "to", "classesId" FROM "class_schedule"`);
        await queryRunner.query(`DROP TABLE "class_schedule"`);
        await queryRunner.query(`ALTER TABLE "temporary_class_schedule" RENAME TO "class_schedule"`);
        await queryRunner.query(`CREATE TABLE "temporary_classes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subject" varchar NOT NULL, "cost" integer NOT NULL, "usersId" varchar, CONSTRAINT "FK_6797eca6f538009401a45fae1b6" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_classes"("id", "subject", "cost", "usersId") SELECT "id", "subject", "cost", "usersId" FROM "classes"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`ALTER TABLE "temporary_classes" RENAME TO "classes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" RENAME TO "temporary_classes"`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subject" varchar NOT NULL, "cost" integer NOT NULL, "usersId" varchar)`);
        await queryRunner.query(`INSERT INTO "classes"("id", "subject", "cost", "usersId") SELECT "id", "subject", "cost", "usersId" FROM "temporary_classes"`);
        await queryRunner.query(`DROP TABLE "temporary_classes"`);
        await queryRunner.query(`ALTER TABLE "class_schedule" RENAME TO "temporary_class_schedule"`);
        await queryRunner.query(`CREATE TABLE "class_schedule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "week_day" integer NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, "classesId" integer)`);
        await queryRunner.query(`INSERT INTO "class_schedule"("id", "week_day", "from", "to", "classesId") SELECT "id", "week_day", "from", "to", "classesId" FROM "temporary_class_schedule"`);
        await queryRunner.query(`DROP TABLE "temporary_class_schedule"`);
        await queryRunner.query(`ALTER TABLE "connections" RENAME TO "temporary_connections"`);
        await queryRunner.query(`CREATE TABLE "connections" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "usersId" varchar)`);
        await queryRunner.query(`INSERT INTO "connections"("id", "created_at", "usersId") SELECT "id", "created_at", "usersId" FROM "temporary_connections"`);
        await queryRunner.query(`DROP TABLE "temporary_connections"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "class_schedule"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "connections"`);
    }

}
