## REST API

API onde um candidato pode fazer seu cadastro e se inscrever em vagas onde empresas vao se registar e cadastrar suas vagas

#### Rodando o projeto

Primeiramente é necessário instalar as dependências do projeto:

`npm install`

ou

`yarn install`

Arquivo .env.example esta no projeto, precisa renomear novamente para .env e adicionar suas configurações de banco.

Depois inicializar o banco de dados e então subir a aplicação:

`npm run start:dev`

ou

`yarn start:dev`

#### Documentação

Foi implementada um documentação do _Swagger_ na aplicação. Através de lá é possível consultar e chamar os endpoits da api. Para acessar, basta ter a aplicação rodando e acessar no navegador o seguinte link:

`http://localhost:3000/api-docs`

(caso a variável de ambiente PORT tenha sido alterada, é necessário alterar a porta 3000 na url acima para o valor setado no .env)
