/*
  Warnings:

  - You are about to drop the column `UserId` on the `post` table. All the data in the column will be lost.
  - Added the required column `userId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_UserId_fkey`;

-- DropIndex
DROP INDEX `post_UserId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_username_key` TO `User_username_key`;
