interface User {
    name_user: string;
    email: string;
    password_user: string;
    role_user: "Candidato" | "Empresa";
}
export declare class CreateUserService {
    execute({ name_user, email, password_user, role_user }: User): Promise<{
        name_user: string;
        email: string;
        password_user: string;
        role_user: import(".prisma/client").$Enums.users_role_user;
        created_at: Date | null;
        id_user: number;
    }>;
}
export declare class UpdateUserService {
    execute(id_user: number, { name_user, email, password_user, role_user, }: User): Promise<{
        name_user: string;
        email: string;
        password_user: string;
        role_user: import(".prisma/client").$Enums.users_role_user;
        created_at: Date | null;
        id_user: number;
    }>;
}
export declare class ListUsersService {
    execute(): Promise<{
        name_user: string;
        email: string;
        password_user: string;
        role_user: import(".prisma/client").$Enums.users_role_user;
        created_at: Date | null;
        id_user: number;
    }[]>;
}
export declare class DeleteUserService {
    execute(id_user: number): Promise<{
        name_user: string;
        email: string;
        password_user: string;
        role_user: import(".prisma/client").$Enums.users_role_user;
        created_at: Date | null;
        id_user: number;
    }>;
}
export declare class LoginUserService {
    execute(email: string, password_user: string): Promise<{
        user: {
            id_user: number;
            name_user: string;
            email: string;
            role_user: import(".prisma/client").$Enums.users_role_user;
        };
        token: string;
    }>;
}
export declare class GetUserByIdService {
    execute(id_user: number): Promise<{
        name_user: string;
        email: string;
        password_user: string;
        role_user: import(".prisma/client").$Enums.users_role_user;
        created_at: Date | null;
        id_user: number;
    } | null>;
}
export {};
//# sourceMappingURL=user.d.ts.map