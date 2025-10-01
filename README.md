# Full Stack Open — Frontend Part 5

Este repositório corresponde à **Parte 5** do curso *Full Stack Open*, que trata sobre **testes em aplicações React** e **autenticação baseada em token no frontend**. :contentReference[oaicite:0]{index=0}

---

## 📚 Objetivos da Parte 5

Nesta fase do curso, você vai:

- Retomar o frontend construído nas partes anteriores e adaptá-lo para funcionar com autenticação token-based :contentReference[oaicite:1]{index=1}  
- Implementar formulário de **login** no frontend  
- Condicionalmente renderizar componentes com base no estado de autenticação  
- Armazenar token no `localStorage` para persistir sessão  
- Integrar chamadas HTTP com o token no cabeçalho `Authorization`  
- Escrever testes para componentes React  
- Utilizar ferramentas de testes end-to-end (como Playwright ou Cypress)  

---

## 🛠️ Instalação e execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/IgorBern02/fullstackopen-frontend-part5.git
   cd fullstackopen-frontend-part5
   ```

   2. Instale dependências:

   ```bash
   npm install
   ```

   3. Crie um arquivo .env na raiz com variáveis de ambiente necessárias, por exemplo:

   ```bash
    PORT=3001
    MONGODB_URI=<sua_uri_mongodb>
    SECRET=<chave_secreta_para_jwt>
   ```

   4. Scripts úteis (ajuste conforme package.json do seu projeto):

   ```bash
     npm start        # inicia o servidor normalmente
     npm run dev      # (se usar nodemon) inicia em modo de desenvolvimento
     npm test         # executa os testes automatizados
   ```

   📂 Estrutura esperada do projeto

A estrutura pode variar, mas normalmente você encontrará algo semelhante a:
  ```bash
.
├── controllers/
│   ├── users.js
│   ├── login.js
│   └── <outros controladores>
├── models/
│   ├── user.js
│   └── <outros modelos>
├── tests/
│   ├── user_api.test.js
│   ├── login_api.test.js
│   └── <outros testes>
├── utils/ (ou middleware/)
│   ├── config.js
│   ├── middleware.js
│   └── <helpers como tokenExtractor, errorHandler etc.>
├── app.js
├── index.js
├── package.json
└── .env
  ```

🔐 Rotas principais & funcionalidades esperadas

Aqui estão algumas rotas comuns nessa parte do curso (ajuste conforme seu código):

Método	Rota	Funcionalidade esperada
POST	/api/users	Criar novo usuário (nome, username, password)
GET	/api/users	Listar todos os usuários (sem expor senhas)
POST	/api/login	Login de usuário → gera token JWT
POST	/api/<recursos>	Criar recurso (ex: note, blog) — requer token válido
GET	/api/<recursos>	Retornar recursos existentes (pode ou não requerer token)

Alguns comportamentos esperados:

- Ao criar usuário, verificar que username e password têm no mínimo 3 caracteres, e que username é único.
- Senha não é armazenada diretamente: use bcrypt para gerar um hash antes de salvar.
- No login, comparar password com o hash salvo; se correto, gerar JWT com jwt.sign(...) usando a SECRET.
- Rota de criação de recurso deve extrair o token do cabeçalho Authorization: Bearer <token>, decodificá-lo e verificar identidade do usuário.
- Middleware para lidar com erros (CastError, ValidationError, JsonWebTokenError, TokenExpiredError, etc.).
- Middleware para extrair token (tokenExtractor) e, possivelmente, usuário (userExtractor).

Referência da parte de autenticação no material oficial: 
Fullstack Open

Exemplo de testes com Supertest / Jest no material da Parte 4: 
Fullstack Open

✅ Testes

Nesta parte do curso, grande foco é escrever testes automatizados:

- Testes de integração para rotas via Supertest (fazer requisições HTTP simuladas).
- Testes para cadastrar usuários inválidos (ex: senha curta → retorno 400).
- Testes para login com credenciais corretas e incorretas.
- Testes para criação de recurso com token válido e com token inválido/ausente (deve rejeitar).
- Testes para listar usuários, verificar que senha não é retornada etc.

📖 Melhorias e extensões possíveis

Depois de implementar tudo, você pode pensar em:

= Expiração de token: definir expiresIn no jwt.sign(...) para tokens expirarem.
= Rotas protegidas adicionais (ex: edição, deleção) com checagem de permissões.
= Refresh token (token de renovação) para melhorar experiência de login.
= Deploy (Heroku, Vercel, etc.).
= Documentação da API (Swagger / OpenAPI).
= Logging mais robusto (morgan + logs de erros).
= Testes mais abrangentes e cobertura de erros extremos.
