import { Request, Response } from "express";
import { CreateUserService, UpdateUserService, DeleteUserService, GetUserByIdService, ListUsersService, LoginUserService  } from "../service/user";

// Controlador para criar um usuário
export class CreateUserController{
    async handle(req: Request, res: Response){
        // Extrair os dados do corpo da requisição
        const { name_user, email, password_user, role_user } = req.body;

        // Verificar se todos os campos necessários foram fornecidos
        if(!name_user || !email || !password_user || !role_user){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        try {
            // Chamar o serviço de criação de usuário
            const createUserService = new CreateUserService();
            // Executar o serviço de criação de usuário
            const user = await createUserService.execute({ name_user, email, password_user, role_user });

            return res.status(201).json(user);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

// Controlador para atualizar um usuário
export class UpdateUserController{
    async handle(req: Request, res: Response){

        const id_user = Number(req.params.id_user)

        // Extrair os dados do corpo da requisição
        const { name_user, email, password_user, role_user } = req.body;

        // Verificar se todos os campos necessários foram fornecidos
        if(!id_user || !name_user || !email || !password_user || !role_user){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        try {
            // Chamar o serviço de atualização de usuário
            const updateUserService = new UpdateUserService()
            // Executar o serviço de atualização de usuário
            const user = await updateUserService.execute(
                id_user,
                { name_user, email, password_user, role_user }
            );

            return res.status(200).json(user);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

// Controlador para deletar um usuário
export class DeleteUserController{
    async handle(req: Request, res: Response){
        // Extrair o id do usuário dos parâmetros da requisição
        const {id_user} = req.params;

        // Verificar se o id do usuário foi fornecido
        if(!id_user){
            return res.status(400).json({ message: "ID do usuário é obrigatório" });
        }

        try {
            // Chamar o serviço de deleção de usuário
            const deleteUserService = new DeleteUserService();
            // Executar o serviço de deleção de usuário
            const user = await deleteUserService.execute(parseInt(id_user));

            return res.status(200).json({ message: "Usuário deletado com sucesso" });

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

// Controlador para listar um usuário pelo ID
export class ListUserController{
    async handle(req: Request, res: Response){
    
        try {
            // Chamar o serviço de listagem de usuários
            const listUserService = new ListUsersService()
            // Executar o serviço de listagem de usuários
            const users = await listUserService.execute()

            if (!users || users.length === 0) {
                return res.status(404).json({ message: "Nenhum usuário encontrado" });
            }

            return res.status(200).json(users);
            
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

// Controlador para listar um usuário pelo ID
export class GetUserByIdController{
    async handle(req: Request, res: Response){
        // Extrair o id do usuário dos parâmetros da requisição
        const {id_user} = req.params

        // Verificar se o id do usuário foi fornecido
        if(!id_user){
            return res.status(400).json({ message: "ID do usuário é obrigatório" });
        }

        try {
            // Chamar o serviço de obtenção de usuário por ID
            const getUserByIdService = new GetUserByIdService()
            // Executar o serviço de obtenção de usuário por ID
            const user = await getUserByIdService.execute(parseInt(id_user))

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

// Controlador para login de usuário
export class LoginUserController{
    async handle(req: Request, res: Response){
        // Extrair os dados do corpo da requisição
        const {email, password_user} = req.body;

        // Verificar se todos os campos necessários foram fornecidos
        if(!email || !password_user){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        try {
            // Chamar o serviço de login de usuário
            const loginUserService = new LoginUserService()
            // Executar o serviço de login de usuário
            const user = await loginUserService.execute(email, password_user)

            return res.status(200).json(user);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}