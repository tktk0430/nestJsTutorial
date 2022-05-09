-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
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
CREATE TABLE "item_categories_category" (
    "itemId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "PK_f5125ad13291eb883608b794cb9" PRIMARY KEY ("itemId","categoryId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "userStatus" VARCHAR NOT NULL DEFAULT E'FREE',

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_32e0f47e48497fc3647e82c4ee" ON "item_categories_category"("itemId");

-- CreateIndex
CREATE INDEX "IDX_cbcba68e69901ab873ec441a7b" ON "item_categories_category"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_78a916df40e02a9deb1c4b75edb" ON "user"("username");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item_categories_category" ADD CONSTRAINT "FK_cbcba68e69901ab873ec441a7b6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_categories_category" ADD CONSTRAINT "FK_32e0f47e48497fc3647e82c4ee5" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
