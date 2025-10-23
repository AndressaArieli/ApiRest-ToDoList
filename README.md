# To-Do List API (TypeScript + Express + MVC)

API RESTful simples para gerenciar uma lista de tarefas (To-Do List), desenvolvida em **Node.js** com **TypeScript**, seguindo o modelo **MVC**.  
Os dados são armazenados em memória (arrays), apenas para fins de estudo.

## Funcionalidades

- Criar, listar, atualizar e deletar tarefas
- Cadastro e login de usuários
- Autenticação com **JWT** (JSON Web Token)
- Validação de dados com **Zod**
- Código organizado em pastas (MVC)

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Zod** (validações)
- **JWT** (autenticação)
- **Bcrypt** (criptografia de senhas)

## Instalação e Configuração

1️⃣ Clonar o projeto
git clone <url-do-repo>
cd todo-api-ts

2️⃣ Instalar dependências
npm install

3️⃣ Dependências utilizadas
npm install express zod jsonwebtoken bcrypt
npm install -D typescript ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt

4️⃣ Configurar o TypeScript
npx tsc --init
Certifique-se de que o arquivo tsconfig.json tem as opções:
json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}

## Como Rodar o Projeto
Servidor configurado para rodar localmente em:
http://localhost:3001

Modo desenvolvimento
npm run dev

Modo compilado
npm run build
npm start

## Autenticação
Para acessar as rotas de tarefas, é necessário enviar o token JWT no header:
Authorization: Bearer SEU_TOKEN_AQUI

## Endpoints Principais
Método	Rota	Descrição
POST	/register	Cria um novo usuário
POST	/login	Faz login e retorna token JWT
POST	/tasks	Cria uma nova tarefa
GET	/tasks	Lista todas as tarefas do usuário
GET	/tasks/:id	Busca tarefa pelo ID
PUT	/tasks/:id	Atualiza uma tarefa
DELETE	/tasks/:id	Deleta uma tarefa

