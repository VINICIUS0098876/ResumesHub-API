import prismaClient from "../prisma/index";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = prismaClient;

interface User {
  id_user?: number;
  name_user: string;
  email_user: string;
  password_user: string;
  role_user: "Candidato" | "Empresa";
}

export class CreateUserService {
  async execute({ name_user, email_user, password_user, role_user }: User) {
    try {
      if (!name_user || !email_user || !password_user || !role_user) {
        throw new Error("Preencha todos os campos");
      }

      const hashedPassword = await bcrypt.hash(password_user, 10);

      const user = await prisma.users.create({
        data: {
          name_user: name_user,
          email_user: email_user,
          password_user: hashedPassword,
          role_user: role_user,
        },
      });

      return user;
    } catch (error) {
      throw new Error("Erro ao criar usuário");
    }
  }
}

export class UpdateUserService {
  async execute({
    id_user,
    name_user,
    email_user,
    password_user,
    role_user,
  }: User) {
    try {
      if (!name_user || !email_user || !password_user || !role_user) {
        throw new Error("Preencha todos os campos");
      }

      const hashedPassword = await bcrypt.hash(password_user, 10);

      const user = await prisma.users.update({
        where: {
          id_user: id_user,
        },
        data: {
          name_user: name_user,
          email_user: email_user,
          password_user: hashedPassword,
          role_user: role_user,
        },
      });

      return user;
    } catch (error) {
      throw new Error("Erro ao atualizar usuário");
    }
  }
}

export class ListUsersService {
  async execute() {
    try {
      const users = await prisma.users.findMany();

      return users;
    } catch (error) {
      throw new Error("Erro ao listar usuários");
    }
  }
}

export class DeleteUserService {
  async execute(id_user: number) {
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
    } catch (error) {
      throw new Error("Erro ao deletar usuário");
    }
  }
}

export class LoginUserService {
  async execute(email_user: string, password_user: string) {
    if (!email_user || !password_user) {
      throw new Error("Preencha todos os campos");
    }

    try {
      const user = await prisma.users.findUnique({
        where: {
          email_user: email_user,
        },
      });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const passwordMatch = await bcrypt.compare(
        password_user,
        user.password_user
      );

      if (!passwordMatch) {
        throw new Error("Credenciais incorretas");
      }

      const token = generateToken({
        id_user: user.id_user,
        role_user: user.role_user,
      });

      return {
        user: {
          id_user: user.id_user,
          name_user: user.name_user,
          email_user: user.email_user,
          role_user: user.role_user,
        },
        token,
      };
    } catch (error) {
      throw new Error("Erro ao realizar login");
    }
  }
}

export class GetUserByIdService {
  async execute(id_user: number) {
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
    } catch (error) {
      throw new Error("Erro ao buscar usuário");
    }
  }
}
