"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetResumeByIdUserService = exports.ListResumesService = exports.GetResumeByIdService = exports.GetMyResumesService = exports.DeleteResumeService = exports.UpdateResumeService = exports.CreateResumeService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class CreateResumeService {
    async execute({ id_user, phone, skills, experience_years, desired_position }) {
        if (!id_user || !phone || !skills || !experience_years || !desired_position) {
            throw new Error("Preencha todos os campos");
        }
        try {
            const resume = await prisma_1.default.resumes.create({
                data: {
                    id_user,
                    phone,
                    skills,
                    experience_years,
                    desired_position
                }
            });
            return resume;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao criar currículo");
        }
    }
}
exports.CreateResumeService = CreateResumeService;
class UpdateResumeService {
    async execute({ id_resume, id_user, phone, skills, experience_years, desired_position }) {
        if (!id_resume || !id_user || !phone || !skills || !experience_years || !desired_position) {
            throw new Error("Preencha todos os campos");
        }
        try {
            const resume = await prisma_1.default.resumes.update({
                where: {
                    id_resume: Number(id_resume)
                },
                data: {
                    id_user,
                    phone,
                    skills,
                    experience_years,
                    desired_position
                }
            });
            return resume;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao atualizar currículo");
        }
    }
}
exports.UpdateResumeService = UpdateResumeService;
class DeleteResumeService {
    async execute(id_resume) {
        if (!id_resume) {
            throw new Error("ID do currículo é obrigatório");
        }
        try {
            const resume = await prisma_1.default.resumes.delete({
                where: {
                    id_resume: Number(id_resume)
                }
            });
            return resume;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao deletar currículo");
        }
    }
}
exports.DeleteResumeService = DeleteResumeService;
// curriculo do usuario logado
class GetMyResumesService {
    async execute(id_user) {
        try {
            const resumes = await prisma_1.default.resumes.findMany({
                where: {
                    id_user: id_user
                }
            });
            if (resumes.length === 0) {
                throw new Error("Nenhum currículo encontrado");
            }
            return resumes;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar currículos");
        }
    }
}
exports.GetMyResumesService = GetMyResumesService;
// Empresa ve o curriculo especifico
class GetResumeByIdService {
    async execute(id_resume) {
        if (!id_resume) {
            throw new Error("ID Inválido");
        }
        try {
            const resume = await prisma_1.default.resumes.findFirst({
                where: {
                    id_resume: Number(id_resume)
                }
            });
            if (!resume) {
                throw new Error("Currículo não encontrado");
            }
            return resume;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar currículo");
        }
    }
}
exports.GetResumeByIdService = GetResumeByIdService;
// empresa ve os curriculos
class ListResumesService {
    async execute() {
        try {
            const resumes = await prisma_1.default.resumes.findMany();
            if (resumes.length === 0) {
                throw new Error("Nenhum curriculo disponivel!");
            }
            return resumes;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao listar os curriculos!");
        }
    }
}
exports.ListResumesService = ListResumesService;
class GetResumeByIdUserService {
    async execute(id_user) {
        if (!id_user) {
            throw new Error("ID do usuário é obrigatório");
        }
        try {
            const resumes = await prisma_1.default.resumes.findMany({
                where: {
                    id_user: Number(id_user)
                }
            });
            if (resumes.length === 0) {
                throw new Error("Nenhum currículo encontrado");
            }
            return resumes;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar currículos");
        }
    }
}
exports.GetResumeByIdUserService = GetResumeByIdUserService;
//# sourceMappingURL=resume.js.map