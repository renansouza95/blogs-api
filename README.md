# Projeto Blogs API

### Descrição

A proposta do projeto era a criação de um back-end de um blog utilizando o sequelize-orm como ponte entre a aplicação e o Banco de dados;

### Principais Tecnologias

- Sequelize-ORM;
- MySQL;
- Express-JS;
- JWT;
- Node-JS;

### Funcionamento

Para testar o funcionamento da aplicação, serão necessárias algumas configurações iniciais:

- Depois de forkar e clonar a aplicação:<br><br>
`npm install` - Para instalação das dependências;<br>

- Para a conexão e manipulação do banco de dados, é necessário que o mesmo esteja instalado na máquina (MYSQL) e a criação na raiz do projeto e configuração do arquivo .env, conforme segue abaixo:<br><br>
`MYSQL_USER=usuário_MySQL`<br>
`MYSQL_PASSWORD=senha_MySQL`<br>
`HOSTNAME=localhost`<br>
`JWT_SECRET=nome_da_chave_secreta`<br>

- Depois de feita as instalções e configuração da conexão com banco, para iniciar a aplicação:

`npm start` - Para inciar a aplicação;

Para fazer os testes dos endpoints existentes, será necessária a utilização de um sistema de requisições (Postman, Insomnia);

- Endpoints:
  - Login: 
    - POST - localhost:3000/login - Realiza o login na aplicação e retorna um token autenticado;

  - Categories: 
    - GET - localhost:3000/categories - Retorna todas as categorias de posts existentes;
    - POST - localhost:3000/categories - Cria uma nova categoria de posts;

  - Posts: 
    - GET - localhost:3000/post - Retorna todos os posts existentes;
    - POST - localhost:3000/post - Cria um novo post;
    - GET - localhost:3000/post/id - Retorna o post de acordo com o id;
    - PUT - localhost:3000/post/id - Edita o post que pertence ao id passado;
    - DELETE - localhost:3000/post/id - Apaga o post que pertence ao id passado;
    - GET - localhost:3000/post/search?q=XXX - Retorna um post ou mais de acordo com o termo passado na query;
  
  - Users: 
    - GET - localhost:3000/user - Retorna todos os usuários existentes;
    - GET - localhost:3000/user/id - Retorna o usuário de acordo com o id;
    - POST - localhost:3000/user - Cria um novo usuário;
    - DELETE - localhost:3000/user/me - Apaga o usuário logado, por meio do token de autenticação;
