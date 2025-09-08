import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = "resumejobmatchsecret";
const EXPIRES = 180;

interface JwtPayload {
  id_user: number;
  role_user: "Candidato" | "Empresa";
}

// Função para gerar token
export function generateToken(
  payload: JwtPayload,
  expiresIn: number = EXPIRES
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// Função para verificar token
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}
