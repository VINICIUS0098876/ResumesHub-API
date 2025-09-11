interface JwtPayload {
    id_user: number;
    role_user: "Candidato" | "Empresa";
}
export declare function generateToken(payload: JwtPayload, expiresIn?: number): string;
export declare function verifyToken(token: string): JwtPayload | null;
export {};
//# sourceMappingURL=jwt.d.ts.map