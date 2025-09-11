import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
export declare function authorize(allowedRoles: ("Candidato" | "Empresa")[]): (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authorize.d.ts.map