/*
  Warnings:

  - You are about to drop the column `comapany` on the `snack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `snack` DROP COLUMN `comapany`,
    ADD COLUMN `company` VARCHAR(191) NULL;
