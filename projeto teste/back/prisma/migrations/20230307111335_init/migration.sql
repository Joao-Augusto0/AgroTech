/*
  Warnings:

  - Added the required column `ocupado` to the `Motorista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motorista` ADD COLUMN `ocupado` BOOLEAN NOT NULL;
