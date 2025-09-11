# ResumesHub-API

## Visão Geral

O **ResumesHub-API** é uma solução moderna para centralizar e gerenciar currículos enviados para empresas. Muitas organizações ainda recebem currículos por e-mail ou até mesmo em papel, o que gera desorganização, dificulta o filtro de candidatos e torna o processo de contratação mais lento. Este sistema resolve esses problemas ao permitir que empresas recebam currículos de forma centralizada e filtrem candidatos por diversos critérios como vaga, experiência, habilidades, entre outros.

## Funcionalidades

- **Centralização dos currículos:** Todos os currículos enviados ficam organizados em uma única plataforma.
- **Segurança e controle de acesso:** Utiliza autenticação JWT e RBAC para garantir que apenas usuários autorizados possam acessar ou modificar informações sensíveis.
- **API RESTful:** Permite integração fácil com outros sistemas ou frontends.
- **Documentação interativa com Swagger.**

## Funcionalidades Implementadas e a Implementar

### 👤 Usuários

- `POST /users/register` → Cadastrar usuário (nome, email, senha, role = candidate ou company)
- `POST /users/login` → Login com JWT
- `GET /users/me` → Ver perfil do usuário logado

### 📄 Currículos

- `POST /resumes` → Criar currículo (apenas candidatos)
  - Campos: name, email, phone, skills, experience_years, desired_position
- `GET /resumes` → Listar currículos (apenas empresas)
- `GET /resumes/:id` → Ver currículo específico (empresa ou o próprio candidato)
- `PUT /resumes/:id` → Atualizar currículo (apenas o dono)
- `DELETE /resumes/:id` → Deletar currículo (apenas o dono)

### 🏢 Vagas

- `POST /jobs` → Criar vaga (apenas empresas)
  - Campos: title, description, requirements, salary_range, location
- `GET /jobs` → Listar todas as vagas
- `GET /jobs/:id` → Ver detalhes da vaga
- `PUT /jobs/:id` → Atualizar vaga (apenas a empresa dona)
- `DELETE /jobs/:id` → Deletar vaga (apenas a empresa dona)

### 🔑 Regras Importantes

- Apenas candidatos podem criar e editar currículos.
- Apenas empresas podem criar e editar vagas.
- Um candidato só pode editar/deletar o próprio currículo.
- Uma empresa só pode editar/deletar suas próprias vagas.

## Tecnologias Utilizadas

- **Node.js + TypeScript:** Plataforma robusta para desenvolvimento backend com tipagem estática e alto desempenho.
- **Express:** Framework minimalista para criação de APIs rápidas e seguras.
- **MySQL:** Banco de dados relacional confiável e escalável.
- **Prisma ORM:** Mapeamento objeto-relacional moderno para facilitar a manipulação dos dados no MySQL.
- **JWT + RBAC:** Autenticação baseada em tokens e controle de acesso por função, garantindo segurança e flexibilidade.
- **Swagger:** Documentação interativa das rotas e funcionalidades da API.

## Estrutura do Projeto

```
src/
├── controllers/
├── routes/
├── services/
├── models/
├── middlewares/
├── prisma/
└── utils/
```

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/VINICIUS0098876/ResumesHub-API.git
   cd ResumesHub-API
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   - Crie um banco MySQL.
   - Edite o arquivo `.env` com suas credenciais do MySQL.

4. **Execute as migrações do Prisma:**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

6. **Acesse a documentação interativa:**
   - Disponível em `/docs` (Swagger).

## Autenticação e Segurança

- O sistema utiliza JWT para autenticação.
- O controle de acesso é realizado via RBAC, permitindo diferentes permissões para recrutadores e candidatos.

## Contribuição

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Nova funcionalidade'`)
4. Push na branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

---

**ResumesHub-API** facilita o processo de contratação, tornando-o mais rápido, organizado e eficiente para empresas de todos os tamanhos.
