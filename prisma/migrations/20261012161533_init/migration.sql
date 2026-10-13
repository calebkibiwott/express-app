/*
  Warnings:

  - You are about to drop the column `authorId` on the `post` table. All the data in the column will be lost.
  - Added the required column `UserId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_authorId_fkey`;

-- DropIndex
DROP INDEX `post_authorId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `authorId`,
    ADD COLUMN `UserId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
