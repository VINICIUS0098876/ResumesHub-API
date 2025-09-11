"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, res, next) {
    // Aqui pega o token do header
    const authHeader = req.headers.authorization;
    // Verifica se o token existe
    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    // Aqui separa o Bearer do token
    const parts = authHeader.split(" ");
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
    const payload = (0, jwt_1.verifyToken)(token);
    // Verifica se o payload é válido
    if (!payload) {
        return res.status(401).json({ message: "Token inválido" });
    }
    // Adiciona o payload na requisição
    req.user = payload;
    next();
}
//# sourceMappingURL=auth.js.map