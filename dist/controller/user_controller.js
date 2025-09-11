"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserController = exports.GetUserByIdController = exports.ListUserController = exports.DeleteUserController = exports.UpdateUserController = exports.CreateUserController = void 0;
const user_1 = require("../service/user");
// Controlador para criar um usuário
class CreateUserController {
    async handle(req, res) {
        // Extrair os dados do corpo da requisição
        const { name_user, email, password_user, role_user } = req.body;
        // Verificar se todos os campos necessários foram fornecidos
        if (!name_user || !email || !password_user || !role_user) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        try {
            // Chamar o serviço de criação de usuário
            const createUserService = new user_1.CreateUserService();
            // Executar o serviço de criação de usuário
            const user = await createUserService.execute({ name_user, email, password_user, role_user });
            return res.status(201).json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.CreateUserController = CreateUserController;
// Controlador para atualizar um usuário
class UpdateUserController {
    async handle(req, res) {
        const id_user = Number(req.params.id_user);
        // Extrair os dados do corpo da requisição
        const { name_user, email, password_user, role_user } = req.body;
        // Verificar se todos os campos necessários foram fornecidos
        if (!id_user || !name_user || !email || !password_user || !role_user) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        try {
            // Chamar o serviço de atualização de usuário
            const updateUserService = new user_1.UpdateUserService();
            // Executar o serviço de atualização de usuário
            const user = await updateUserService.execute(id_user, { name_user, email, password_user, role_user });
            return res.status(200).json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.UpdateUserController = UpdateUserController;
// Controlador para deletar um usuário
class DeleteUserController {
    async handle(req, res) {
        // Extrair o id do usuário dos parâmetros da requisição
        const { id_user } = req.params;
        // Verificar se o id do usuário foi fornecido
        if (!id_user) {
            return res.status(400).json({ message: "ID do usuário é obrigatório" });
        }
        try {
            // Chamar o serviço de deleção de usuário
            const deleteUserService = new user_1.DeleteUserService();
            // Executar o serviço de deleção de usuário
            const user = await deleteUserService.execute(parseInt(id_user));
            return res.status(200).json({ message: "Usuário deletado com sucesso" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
// Controlador para listar um usuário pelo ID
class ListUserController {
    async handle(req, res) {
        try {
            // Chamar o serviço de listagem de usuários
            const listUserService = new user_1.ListUsersService();
            // Executar o serviço de listagem de usuários
            const users = await listUserService.execute();
            if (!users || users.length === 0) {
                return res.status(404).json({ message: "Nenhum usuário encontrado" });
            }
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.ListUserController = ListUserController;
// Controlador para listar um usuário pelo ID
class GetUserByIdController {
    async handle(req, res) {
        // Extrair o id do usuário dos parâmetros da requisição
        const { id_user } = req.params;
        // Verificar se o id do usuário foi fornecido
        if (!id_user) {
            return res.status(400).json({ message: "ID do usuário é obrigatório" });
        }
        try {
            // Chamar o serviço de obtenção de usuário por ID
            const getUserByIdService = new user_1.GetUserByIdService();
            // Executar o serviço de obtenção de usuário por ID
            const user = await getUserByIdService.execute(parseInt(id_user));
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.GetUserByIdController = GetUserByIdController;
// Controlador para login de usuário
class LoginUserController {
    async handle(req, res) {
        // Extrair os dados do corpo da requisição
        const { email, password_user } = req.body;
        // Verificar se todos os campos necessários foram fornecidos
        if (!email || !password_user) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        try {
            // Chamar o serviço de login de usuário
            const loginUserService = new user_1.LoginUserService();
            // Executar o serviço de login de usuário
            const user = await loginUserService.execute(email, password_user);
            return res.status(200).json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.LoginUserController = LoginUserController;
//# sourceMappingURL=user_controller.js.map