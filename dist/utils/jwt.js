"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = "resumejobmatchsecret";
const EXPIRES = 18000000;
// Função para gerar token
function generateToken(payload, expiresIn = EXPIRES) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
}
// Função para verificar token
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (err) {
        return null;
    }
}
//# sourceMappingURL=jwt.js.map