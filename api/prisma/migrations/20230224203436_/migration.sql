/*
  Warnings:

  - You are about to drop the column `discription` on the `items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;