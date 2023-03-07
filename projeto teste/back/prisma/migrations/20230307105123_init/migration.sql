/*
  Warnings:

  - Added the required column `ocupado` to the `Frota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `frota` ADD COLUMN `ocupado` VARCHAR(191) NOT NULL;
