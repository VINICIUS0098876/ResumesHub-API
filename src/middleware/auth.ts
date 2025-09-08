import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { id_user: number; role_user: "Candidato" | "Empresa" };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Aqui pega o token do header
  const authHeader = req.headers.authorization;

  // Verifica se o token existe
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // Aqui separa o Bearer do token
  const parts = authHeader!.split(" ");

  // Verifica se o token está no formato correto
  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  // Aqui desestrutura o Bearer e o token
  const [scheme, token] = parts;

  // Verifica se o esquema é Bearer
  if (!token || scheme !== "Bearer") {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  // Verifica se o token é válido
  const payload = verifyToken(token);

  // Verifica se o payload é válido
  if (!payload) {
    return res.status(401).json({ message: "Token inválido" });
  }

  // Adiciona o payload na requisição
  req.user = payload;

  next();
}
