"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./controller/user_controller");
const resume_controller_1 = require("./controller/resume_controller");
const job_controller_1 = require("./controller/job_controller");
const auth_1 = require("./middleware/auth");
const authorize_1 = require("./middleware/authorize");
const routes = (0, express_1.Router)();
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
routes.post('/users', async (request, response) => new user_controller_1.CreateUserController().handle(request, response));
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
routes.put('/users/:id_user', async (request, response) => new user_controller_1.UpdateUserController().handle(request, response));
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
routes.delete('/users/:id_user', async (request, response) => new user_controller_1.DeleteUserController().handle(request, response));
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
routes.get('/users/:id_user', async (request, response) => new user_controller_1.GetUserByIdController().handle(request, response));
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
routes.get('/users', async (request, response) => new user_controller_1.ListUserController().handle(request, response));
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
routes.post('/login', async (request, response) => new user_controller_1.LoginUserController().handle(request, response));
// -----------------------------------------------------------------------------------------------------------
// resume routes
/**
 * @swagger
 * /resumes:
 *   post:
 *     summary: Cria um novo currículo (Candidato)
 *     tags: [Resumes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 example: 5
 *               phone:
 *                 type: string
 *                 example: "11999999999"
 *               skills:
 *                 type: string
 *                 example: "JavaScript, Node.js, React"
 *               experience_years:
 *                 type: integer
 *                 example: 2
 *               desired_position:
 *                 type: string
 *                 example: "Desenvolvedor Full Stack"
 *     responses:
 *       201:
 *         description: Currículo criado com sucesso
 *       400:
 *         description: Preencha todos os campos
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
routes.post('/resumes', auth_1.authMiddleware, (0, authorize_1.authorize)(['Candidato']), async (request, response) => new resume_controller_1.CreateResumeController().handle(request, response));
/**
 * @swagger
 * /resumes/me:
 *   get:
 *     summary: Lista os currículos do usuário logado (Candidato)
 *     tags: [Resumes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de currículos do usuário
 *         content:
 *           application/json:
 *             example:
 *               - id_resume: 3
 *                 id_user: 5
 *                 phone: "11959292319"
 *                 skills: "Node.js, JavaScript"
 *                 experience_years: 4
 *                 desired_position: "Desenvolvedora Web"
 *                 created_at: "2025-09-10T22:51:50.000Z"
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Nenhum currículo encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/resumes/me', auth_1.authMiddleware, (0, authorize_1.authorize)(['Candidato']), async (request, response) => new resume_controller_1.GetMyResumeController().handle(request, response));
/**
 * @swagger
 * /resumes/{id_resume}:
 *   put:
 *     summary: Atualiza um currículo existente (Candidato)
 *     tags: [Resumes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_resume
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do currículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               skills:
 *                 type: string
 *               experience_years:
 *                 type: integer
 *               desired_position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Currículo atualizado com sucesso
 *       400:
 *         description: Preencha todos os campos
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Currículo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.put('/resumes/:id_resume', auth_1.authMiddleware, (0, authorize_1.authorize)(['Candidato']), async (request, response) => new resume_controller_1.UpdateResumeController().handle(request, response));
/**
 * @swagger
 * /resumes/{id_resume}:
 *   delete:
 *     summary: Deleta um currículo existente (Candidato)
 *     tags: [Resumes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_resume
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do currículo
 *     responses:
 *       200:
 *         description: Currículo deletado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: "Currículo deletado com sucesso"
 *       400:
 *         description: ID do currículo é obrigatório
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
routes.delete('/resumes/:id_resume', auth_1.authMiddleware, (0, authorize_1.authorize)(['Candidato']), async (request, response) => new resume_controller_1.DeleteResumeController().handle(request, response));
// Resumes - Empresa
/**
 * @swagger
 * /resumes:
 *   get:
 *     summary: Lista todos os currículos disponíveis (Empresa)
 *     tags: [Resumes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de currículos
 *         content:
 *           application/json:
 *             example:
 *               - id_resume: 2
 *                 id_user: 1
 *                 phone: "11986311407"
 *                 skills: "Node.js, TS"
 *                 experience_years: 2
 *                 desired_position: "Desenvolvedor Backend"
 *                 created_at: "2025-09-10T19:48:04.000Z"
 *               - id_resume: 3
 *                 id_user: 5
 *                 phone: "11959292319"
 *                 skills: "Node.js, JavaScript"
 *                 experience_years: 4
 *                 desired_position: "Desenvolvedora Web"
 *                 created_at: "2025-09-10T22:51:50.000Z"
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/resumes', auth_1.authMiddleware, (0, authorize_1.authorize)(['Empresa']), async (request, response) => new resume_controller_1.ListResumeController().handle(request, response));
/**
 * @swagger
 * /resumes/{id_resume}:
 *   get:
 *     summary: Retorna um currículo específico (Empresa)
 *     tags: [Resumes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_resume
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do currículo
 *     responses:
 *       200:
 *         description: Currículo encontrado
 *         content:
 *           application/json:
 *             example:
 *               id_resume: 3
 *               id_user: 5
 *               phone: "11959292319"
 *               skills: "Node.js, JavaScript"
 *               experience_years: 4
 *               desired_position: "Desenvolvedora Web"
 *               created_at: "2025-09-10T22:51:50.000Z"
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Currículo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/resumes/:id_resume', auth_1.authMiddleware, (0, authorize_1.authorize)(['Empresa']), async (request, response) => new resume_controller_1.GetResumeByIdController().handle(request, response));
// -----------------------------------------------------------------------------------------------------------
// job routes
/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Cria uma nova vaga de emprego (Empresa)
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 example: 2
 *               title:
 *                 type: string
 *                 example: "Desenvolvedor Backend"
 *               description:
 *                 type: string
 *                 example: "Responsável pelo desenvolvimento de APIs em Node.js"
 *               requirements:
 *                 type: string
 *                 example: "Node.js, TypeScript, MySQL"
 *               salary_range:
 *                 type: string
 *                 example: "R$ 4.000 - R$ 6.000"
 *               location:
 *                 type: string
 *                 example: "São Paulo - SP"
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *       400:
 *         description: Preencha todos os campos
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
routes.post('/jobs', auth_1.authMiddleware, (0, authorize_1.authorize)(['Empresa']), async (request, response) => new job_controller_1.CreateJobController().handle(request, response));
/**
 * @swagger
 * /jobs/me:
 *   get:
 *     summary: Lista as vagas criadas pelo usuário logado (Empresa)
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vagas do usuário
 *         content:
 *           application/json:
 *             example:
 *               - id_job: 1
 *                 id_user: 2
 *                 title: "Desenvolvedor Backend"
 *                 description: "Responsável pelo desenvolvimento de APIs em Node.js"
 *                 requirements: "Node.js, TypeScript, MySQL"
 *                 salary_range: "R$ 4.000 - R$ 6.000"
 *                 location: "São Paulo - SP"
 *                 created_at: "2025-09-11T20:00:00.000Z"
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Nenhuma vaga encontrada
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/jobs/me', auth_1.authMiddleware, (0, authorize_1.authorize)(['Empresa']), async (request, response) => new job_controller_1.GetMyJobController().handle(request, response));
/**
 * @swagger
 * /jobs/{id_job}:
 *   put:
 *     summary: Atualiza uma vaga existente (Empresa)
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_job
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salary_range:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *       400:
 *         description: Preencha todos os campos
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
routes.put('/jobs/:id_job', auth_1.authMiddleware, (0, authorize_1.authorize)(['Empresa']), async (request, response) => new job_controller_1.UpdateJobController().handle(request, response));
/**
 * @swagger
 * /jobs/{id_job}:
 *   delete:
 *     summary: Deleta uma vaga existente (Empresa)
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_job
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Vaga deletada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: "Vaga deletada com sucesso"
 *       400:
 *         description: ID da vaga é obrigatório
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
routes.delete('/jobs/:id_job', auth_1.authMiddleware, (0, authorize_1.authorize)(['Empresa']), async (request, response) => new job_controller_1.DeleteJobController().handle(request, response));
// Jobs - Candidato
/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Lista todas as vagas disponíveis (Candidato)
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             example:
 *               - id_job: 1
 *                 id_user: 2
 *                 title: "Desenvolvedor Backend"
 *                 description: "Responsável pelo desenvolvimento de APIs em Node.js"
 *                 requirements: "Node.js, TypeScript, MySQL"
 *                 salary_range: "R$ 4.000 - R$ 6.000"
 *                 location: "São Paulo - SP"
 *                 created_at: "2025-09-11T20:00:00.000Z"
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Nenhuma vaga encontrada
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/jobs', auth_1.authMiddleware, (0, authorize_1.authorize)(['Candidato']), async (request, response) => new job_controller_1.ListJobController().handle(request, response));
/**
 * @swagger
 * /jobs/{id_job}:
 *   get:
 *     summary: Retorna uma vaga específica (Candidato)
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_job
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Vaga encontrada
 *         content:
 *           application/json:
 *             example:
 *               id_job: 1
 *               id_user: 2
 *               title: "Desenvolvedor Backend"
 *               description: "Responsável pelo desenvolvimento de APIs em Node.js"
 *               requirements: "Node.js, TypeScript, MySQL"
 *               salary_range: "R$ 4.000 - R$ 6.000"
 *               location: "São Paulo - SP"
 *               created_at: "2025-09-11T20:00:00.000Z"
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/jobs/:id_job', auth_1.authMiddleware, (0, authorize_1.authorize)(['Candidato']), async (request, response) => new job_controller_1.GetJobByIdController().handle(request, response));
exports.default = routes;
//# sourceMappingURL=routes.js.map