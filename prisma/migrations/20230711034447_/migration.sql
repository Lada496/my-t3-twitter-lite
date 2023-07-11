/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Tweet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Tweet_userId_key" ON "Tweet"("userId");
