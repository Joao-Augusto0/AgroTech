/*
  Warnings:

  - Made the column `descricao` on table `manutencao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valor` on table `manutencao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `manutencao` MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `valor` DOUBLE NOT NULL;
