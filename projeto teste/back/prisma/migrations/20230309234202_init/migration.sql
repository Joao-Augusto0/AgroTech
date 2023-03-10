/*
  Warnings:

  - A unique constraint covering the columns `[placa]` on the table `Frota` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Motorista` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnh]` on the table `Motorista` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tipo` to the `Frota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `frota` ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Frota_placa_key` ON `Frota`(`placa`);

-- CreateIndex
CREATE UNIQUE INDEX `Motorista_cpf_key` ON `Motorista`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `Motorista_cnh_key` ON `Motorista`(`cnh`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);
