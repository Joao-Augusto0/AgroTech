/*
  Warnings:

  - Added the required column `descricao` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servico` ADD COLUMN `descricao` VARCHAR(191) NOT NULL;
