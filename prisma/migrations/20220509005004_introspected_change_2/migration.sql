/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item_categories_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1";

-- DropForeignKey
ALTER TABLE "item_categories_category" DROP CONSTRAINT "FK_cbcba68e69901ab873ec441a7b6";

-- DropForeignKey
ALTER TABLE "item_categories_category" DROP CONSTRAINT "FK_32e0f47e48497fc3647e82c4ee5";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "item";

-- DropTable
DROP TABLE "item_categories_category";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemToCategories" (
    "itemId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "PK_f5125ad13291eb883608b794cb9" PRIMARY KEY ("itemId","categoryId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "userStatus" VARCHAR NOT NULL DEFAULT E'FREE',

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_32e0f47e48497fc3647e82c4ee" ON "ItemToCategories"("itemId");

-- CreateIndex
CREATE INDEX "IDX_cbcba68e69901ab873ec441a7b" ON "ItemToCategories"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_78a916df40e02a9deb1c4b75edb" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ItemToCategories" ADD CONSTRAINT "FK_cbcba68e69901ab873ec441a7b6" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemToCategories" ADD CONSTRAINT "FK_32e0f47e48497fc3647e82c4ee5" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
