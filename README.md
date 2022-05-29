# RENTALX
Projeto utilizando TypeScript seguindo padrões de código e princípios do SOLID. 
Conceitos importantes aplicados: Casos de uso, repositórios, models, streams do Node.js e documentação de APIs com Swagger.


## Expert/Instructor
| [<img src="https://avatars.githubusercontent.com/u/5041791?v=4" width="75px;"/>](https://github.com/danileao) |
| :--------------------------------------------------------------------------------------------------------: |
|                             [Daniele Leão](https://github.com/danileao)                             |



# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro
Deve ser possível listar todas as categorias

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastado por padrão, com disponíbilidade.
O usuário responsável pelo cadastro deve ser um usuário adminsitrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro



**RN**
O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro


**RN**
Não deve ser possível cadastar uma especificação para um carro não cadastrado.
Não deve ser possível cadastar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usário administrador.


# Cadastro de imangens do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador


# Aluguel de carro
**RF**
Deve ser possível cadastrar um aluguel


**RN**
O aluguel deve ter duração mínima de 24 horas
Não deve ser possível cadastar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastar um novo aluguel caso já exista um aberto para o mesmo carro
O Usuário deve estar logado na aplicação
Ao realizar o aluguel o status do carro deverá ser alterado para indisponível.


# Devoluçao de carro
**RF** 
Deve ser possivel realizar a devolução de um carro

**RN*
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.


# Listagem de alugueis para usuario
**RF**
Deve ser possivel realizar a busca de todos os alugueis para o usuario

**RN**
O usuario deve estar logado na aplicação









