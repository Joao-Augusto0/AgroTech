/*
  Warnings:

  - The primary key for the `frota` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_veiculo` on the `manutencao` table. All the data in the column will be lost.
  - The primary key for the `motorista` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_motorista` on the `servico` table. All the data in the column will be lost.
  - You are about to drop the column `id_veiculo` on the `servico` table. All the data in the column will be lost.
  - Added the required column `placaVeiculo` to the `Manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpfMotorista` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placaVeiculo` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `manutencao` DROP FOREIGN KEY `Manutencao_id_veiculo_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_id_motorista_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_id_veiculo_fkey`;

-- AlterTable
ALTER TABLE `frota` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`placa`);

-- AlterTable
ALTER TABLE `manutencao` DROP COLUMN `id_veiculo`,
    ADD COLUMN `placaVeiculo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `motorista` DROP PRIMARY KEY,
    MODIFY `id_motorista` INTEGER NOT NULL,
    ADD PRIMARY KEY (`cpf`);

-- AlterTable
ALTER TABLE `servico` DROP COLUMN `id_motorista`,
    DROP COLUMN `id_veiculo`,
    ADD COLUMN `cpfMotorista` VARCHAR(191) NOT NULL,
    ADD COLUMN `placaVeiculo` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_cpfMotorista_fkey` FOREIGN KEY (`cpfMotorista`) REFERENCES `Motorista`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_placaVeiculo_fkey` FOREIGN KEY (`placaVeiculo`) REFERENCES `Frota`(`placa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Manutencao` ADD CONSTRAINT `Manutencao_placaVeiculo_fkey` FOREIGN KEY (`placaVeiculo`) REFERENCES `Frota`(`placa`) ON DELETE RESTRICT ON UPDATE CASCADE;
