"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
// Middleware para autorização baseado em papéis
function authorize(allowedRoles) {
    // Função middleware
    return (req, res, next) => {
        // Obtém o usuário da requisição
        const user = req.user;
        // Verifica se o usuário está autenticado
        if (!user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        // Verifica se o usuário tem permissão
        if (!allowedRoles.includes(user.role_user)) {
            return res.status(403).json({ message: "Usuário não autorizado" });
        }
        // Se tudo estiver ok, chama o próximo middleware
        next();
    };
}
//# sourceMappingURL=authorize.js.map