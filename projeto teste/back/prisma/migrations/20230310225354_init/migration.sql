/*
  Warnings:

  - The primary key for the `frota` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `frota` table. All the data in the column will be lost.
  - The primary key for the `manutencao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `manutencao` table. All the data in the column will be lost.
  - You are about to drop the column `placaVeiculo` on the `manutencao` table. All the data in the column will be lost.
  - The primary key for the `motorista` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `servico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cpfMotorista` on the `servico` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `servico` table. All the data in the column will be lost.
  - You are about to drop the column `placaVeiculo` on the `servico` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `id_frota` to the `Frota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_manutencao` to the `Manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placa` to the `Manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_servico` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placa` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `manutencao` DROP FOREIGN KEY `Manutencao_placaVeiculo_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_cpfMotorista_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_placaVeiculo_fkey`;

-- AlterTable
ALTER TABLE `frota` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_frota` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_frota`, `placa`);

-- AlterTable
ALTER TABLE `manutencao` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `placaVeiculo`,
    ADD COLUMN `id_manutencao` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `placa` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_manutencao`);

-- AlterTable
ALTER TABLE `motorista` DROP PRIMARY KEY,
    MODIFY `id_motorista` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_motorista`, `cpf`);

-- AlterTable
ALTER TABLE `servico` DROP PRIMARY KEY,
    DROP COLUMN `cpfMotorista`,
    DROP COLUMN `id`,
    DROP COLUMN `placaVeiculo`,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_servico` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `placa` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_servico`);

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_usuario`);

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_cpf_fkey` FOREIGN KEY (`cpf`) REFERENCES `Motorista`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_placa_fkey` FOREIGN KEY (`placa`) REFERENCES `Frota`(`placa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Manutencao` ADD CONSTRAINT `Manutencao_placa_fkey` FOREIGN KEY (`placa`) REFERENCES `Frota`(`placa`) ON DELETE RESTRICT ON UPDATE CASCADE;
