/*
  Warnings:

  - You are about to drop the column `adminId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_adminId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "adminId",
ADD COLUMN     "favoriteById" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adminId";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_name_key" ON "User"("username", "name");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_favoriteById_fkey" FOREIGN KEY ("favoriteById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
