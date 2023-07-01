# AgroTech
# Sobre o projeto

Agro Tech é uma aplicação full stack construída durante o 3.º semestre do curso técnico em desenvolvimento de 
sistemas pelo [Senai]

A aplicação consiste em fazer um sistema que ajude uma empresa agrícola a gerenciar sua frota de veículos, tendo 
como principal objetivo fornecer um conjunto completo de relatórios que permitam o monitoramento das manutenções 
dos veículos

Existe 2 tipos de usuários, usuário operacional e usuário gerencial
o operacional só pode ter acesso aos relatórios e o gerencial tem acesso a tudo

## Layout Web

# Tela login
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/2b90037f-b540-4730-8db8-8f56adce6519)

# Tela Home 
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/8883f37a-4b4f-46bd-9635-f766e8f96174)

# Relatório de disponibilidade
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/de43599a-ffd7-467d-a064-b3c628c1ea7d)

# Relatório de manutenção
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/3769b2d4-8f4b-4e7f-9920-1f320ba3d295)

# Relatório de alocação
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/fd9ac5b1-90c1-4836-8987-f673b307ddeb)

# Tela de Motoristas
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/8c66f846-d487-433b-a3ae-c6dcabea7430)

# Tela de Frota 
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/7790b148-ac6a-4176-9465-28d6f6944d75)

# tela de Operações 
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/293c4396-8127-419f-8d87-8ecde5c91e87)

# Tela de Manutenções
![image](https://github.com/Joao-Augusto0/AgroTech/assets/98486135/a24edfbf-c7a7-47da-86fb-ea7247d4594e)

# Tecnologias utilizadas
## Back end
- Node js
- Express.js
- Prisma.io

## Front end
- HTML / CSS / JS
- Chart JS

# Como executar o projeto

## Back end

```bash
# clonar repositório

git clone https://github.com/Joao-Augusto0/AgroTech

# entrar na pasta do projeto
cd '.\projeto teste\'

# entrar na pasta do projeto back end 
Pré-requisitos: npm

cd .\back\

# baixar dependencias 
npm i

# conectar banco de dados

crie um arquivo .env dentro da pasta back

e cole esse comando: 
DATABASE_URL="mysql://root:@localhost:3306/agrotech"
KEY=PASSWORD

# criar arquivo de migração

npx prisma migrate dev --name init

# importar dados

## criar Usuarios
instale o insomnia, clique na opção criar, selecione import, clique em file e selecione o 
arquivo que está dentro da pasta clonada, siga este caminho: projeto teste>docs 
e selecione o arquivo Insomnia, clique em scan, abra o documento e va em debug, selecione a
pasta Usuario, depois em Criar Usuario selecione Text JSON depois cole estes dados: 

{
      "nome": "Usuário Gerente",
      "email": "gerente@example.com",
      "senha": "senhagerente",
      "role": "Gerente"
} 

ou

{
      "nome": "Usuário Operario",
      "email": "perario@example.com",
      "senha": "senhaoperario",
      "role": "Operario"
}

e envie

## outros dados

dados teste da frota: 

INSERT INTO veiculos (modelo, placa, marca, ocupado, tipo, id_frota)
VALUES
    ('Modelo1', 'ABC1234', 'Marca1', 0, 'Tipo1', 1),
    ('Modelo2', 'DEF5678', 'Marca2', 0, 'Tipo2', 1),
    ('Modelo3', 'GHI9012', 'Marca3', 0, 'Tipo1', 2),
    ('Modelo4', 'JKL3456', 'Marca2', 0, 'Tipo3', 2),
    ('Modelo5', 'MNO7890', 'Marca1', 0, 'Tipo2', 3),
    ('Modelo6', 'PQR2345', 'Marca3', 0, 'Tipo1', 3),
    ('Modelo7', 'STU6789', 'Marca2', 0, 'Tipo3', 4),
    ('Modelo8', 'VWX0123', 'Marca1', 0, 'Tipo1', 4),
    ('Modelo9', 'YZA4567', 'Marca3', 0, 'Tipo2', 5),
    ('Modelo10', 'BCD8901', 'Marca2', 0, 'Tipo3', 5);


e

INSERT INTO motorista (nome, cpf, cnh, ocupado)
VALUES
    ('Motorista1', '11111111111', '12345678901', 0),
    ('Motorista2', '22222222222', '23456789012', 0),
    ('Motorista3', '33333333333', '34567890123', 0),
    ('Motorista4', '44444444444', '45678901234', 0),
    ('Motorista5', '55555555555', '56789012345', 0),
    ('Motorista6', '66666666666', '67890123456', 0),
    ('Motorista7', '77777777777', '78901234567', 0),
    ('Motorista8', '88888888888', '89012345678', 0),
    ('Motorista9', '99999999999', '90123456789', 0),
    ('Motorista10', '00000000000', '01234567890', 0);

# executar o projeto

ter o XAMPP instalado e dar start em Apache e MySQL
depois rodar o comando

nodemon ou node index.js no projeto
```
## Front End
abrir arquivo com Live Server front/pages/login/login.html
