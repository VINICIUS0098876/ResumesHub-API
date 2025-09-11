"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdService = exports.LoginUserService = exports.DeleteUserService = exports.ListUsersService = exports.UpdateUserService = exports.CreateUserService = void 0;
const index_1 = __importDefault(require("../prisma/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const prisma = index_1.default;
class CreateUserService {
    async execute({ name_user, email, password_user, role_user }) {
        try {
            if (!name_user || !email || !password_user || !role_user) {
                throw new Error("Preencha todos os campos");
            }
            // Validação de email
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                throw new Error("E-mail inválido!");
            }
            // Validação de senha
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(password_user)) {
                throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais!");
            }
            const hashedPassword = await bcrypt_1.default.hash(password_user, 10);
            const user = await prisma.users.create({
                data: {
                    name_user: name_user,
                    email,
                    password_user: hashedPassword,
                    role_user: role_user,
                }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao criar usuário");
        }
    }
}
exports.CreateUserService = CreateUserService;
class UpdateUserService {
    async execute(id_user, { name_user, email, password_user, role_user, }) {
        try {
            if (!name_user || !email || !password_user || !role_user) {
                throw new Error("Preencha todos os campos");
            }
            const hashedPassword = await bcrypt_1.default.hash(password_user, 10);
            const user = await prisma.users.update({
                where: {
                    id_user: id_user,
                },
                data: {
                    name_user: name_user,
                    email,
                    password_user: hashedPassword,
                    role_user: role_user
                }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao atualizar usuário");
        }
    }
}
exports.UpdateUserService = UpdateUserService;
class ListUsersService {
    async execute() {
        try {
            const users = await prisma.users.findMany();
            return users;
        }
        catch (error) {
            throw new Error("Erro ao listar usuários");
        }
    }
}
exports.ListUsersService = ListUsersService;
class DeleteUserService {
    async execute(id_user) {
        if (!id_user) {
            throw new Error("ID do usuário não fornecido");
        }
        try {
            const user = await prisma.users.delete({
                where: {
                    id_user: id_user,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error("Erro ao deletar usuário");
        }
    }
}
exports.DeleteUserService = DeleteUserService;
class LoginUserService {
    async execute(email, password_user) {
        if (!email || !password_user) {
            throw new Error("Preencha todos os campos");
        }
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email
                }
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const passwordMatch = await bcrypt_1.default.compare(password_user, user.password_user);
            if (!passwordMatch) {
                throw new Error("Credenciais incorretas");
            }
            const token = (0, jwt_1.generateToken)({
                id_user: user.id_user,
                role_user: user.role_user,
            });
            return {
                user: {
                    id_user: user.id_user,
                    name_user: user.name_user,
                    email: user.email,
                    role_user: user.role_user,
                },
                token,
            };
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao realizar login");
        }
    }
}
exports.LoginUserService = LoginUserService;
class GetUserByIdService {
    async execute(id_user) {
        if (!id_user) {
            throw new Error("ID do usuário não fornecido");
        }
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id_user: id_user,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error("Erro ao buscar usuário");
        }
    }
}
exports.GetUserByIdService = GetUserByIdService;
//# sourceMappingURL=user.js.map