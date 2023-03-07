/*
  Warnings:

  - You are about to alter the column `ocupado` on the `frota` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `frota` MODIFY `ocupado` BOOLEAN NOT NULL;
