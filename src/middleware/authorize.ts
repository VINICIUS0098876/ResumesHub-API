import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

// Middleware para autorização baseado em papéis
export function authorize(allowedRoles: ("Candidato" | "Empresa")[]){

    // Função middleware
    return (req: AuthRequest, res: Response, next: NextFunction)=>{

        // Obtém o usuário da requisição
        const user = req.user;

        // Verifica se o usuário está autenticado
        if(!user){
            return res.status(401).json({message: "Usuário não autenticado"});
        }

        // Verifica se o usuário tem permissão
        if(!allowedRoles.includes(user.role_user)){
            return res.status(403).json({message: "Usuário não autorizado"});
        }
        
        // Se tudo estiver ok, chama o próximo middleware
        next();
    }
}