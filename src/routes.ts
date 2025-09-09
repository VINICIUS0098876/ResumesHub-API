import { Router } from 'express';
import { CreateUserController, UpdateUserController, DeleteUserController, GetUserByIdController, ListUserController, LoginUserController } from './controller/user_controller';


const routes = Router();

// User routes
/**
* @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_user:
 *                 type: string
 *                 example: Vinicius Guimarães Roberto
 *               email_user:
 *                 type: string
 *                 example: vinicius@gmail.com
 *               password_user:
 *                 type: string
 *                 example: Vini040@
 *               role_user:
 *                 type: string
 *                 enum: [Candidato, Empresa]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Preencha todos os campos
 *       500:
 *         description: Erro interno do servidor
 */
routes.post('/users', async (request, response) => new CreateUserController().handle(request, response));

/**
 * @swagger
 * /users/{id_user}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_user:
 *                 type: string
 *                 example: Miguel Pereira de Oliveira
 *               email_user:
 *                 type: string
 *                 example: miguel@gmail.com
 *               password_user:
 *                 type: string
 *                 example: Miguel123@
 *               role_user:
 *                 type: string
 *                 enum: [Candidato, Empresa]
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id_user: 3
 *               name_user: "Miguel Pereira de Oliveira"
 *               email: "miguel@gmail.com"
 *               role_user: "Candidato"
 *               created_at: "2025-09-09T03:26:08.000Z"
 *       400:
 *         description: Preencha todos os campos
 *       500:
 *         description: Erro interno do servidor
 */
routes.put('/users/:id_user', (request, response) => new UpdateUserController().handle(request, response));

/**
 * @swagger
 * /users/{id_user}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuário deletado com sucesso"
 *       400:
 *         description: ID do usuário é obrigatório
 *       500:
 *         description: Erro interno do servidor
 */
routes.delete('/users/:id_user', (request, response) => new DeleteUserController().handle(request, response));

/**
 * @swagger
 * /users/{id_user}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             example:
 *               id_user: 1
 *               name_user: "Vinicius Guimarães Roberto"
 *               email: "vinicius@gmail.com"
 *               role_user: "Candidato"
 *               created_at: "2025-09-09T02:44:46.000Z"
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: ID do usuário é obrigatório
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/users/:id_user', (request, response) => new GetUserByIdController().handle(request, response));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             example:
 *               - id_user: 1
 *                 name_user: "Vinicius Guimarães Roberto"
 *                 email: "vinicius@gmail.com"
 *                 role_user: "Candidato"
 *                 created_at: "2025-09-09T02:44:46.000Z"
 *               - id_user: 3
 *                 name_user: "Miguel Pereira de Oliveira"
 *                 email: "miguel@gmail.com"
 *                 role_user: "Candidato"
 *                 created_at: "2025-09-09T03:26:08.000Z"
 *       404:
 *         description: Nenhum usuário encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/users', (request, response) => new ListUserController().handle(request, response));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login de usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: miguel@gmail.com
 *               password_user:
 *                 type: string
 *                 example: Miguel123@
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id_user: 3
 *                 name_user: "Miguel Pereira de Oliveira"
 *                 email: "miguel@gmail.com"
 *                 role_user: "Candidato"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Preencha todos os campos
 *       500:
 *         description: Erro interno do servidor
 */
routes.post('/login', (request, response) => new LoginUserController().handle(request, response));

// resume routes

// job routes


export default routes;



