import type { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        id_user: number;
        role_user: "Candidato" | "Empresa";
    };
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map