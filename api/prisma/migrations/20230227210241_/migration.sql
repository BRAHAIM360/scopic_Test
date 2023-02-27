-- AlterTable
ALTER TABLE "users" ADD COLUMN     "itemId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
