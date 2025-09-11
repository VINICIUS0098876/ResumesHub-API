"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListJobService = exports.GetJobByIdService = exports.GetMyJobService = exports.DeleteJobService = exports.UpdateJobService = exports.CreateJobService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class CreateJobService {
    async execute({ id_user, title, description, requirements, salary_range, location }) {
        if (!id_user || !title) {
            throw new Error("Preencha os campos obrigatorios!");
        }
        try {
            const job = await prisma_1.default.jobs.create({
                data: {
                    id_user,
                    title,
                    description,
                    requirements,
                    salary_range,
                    location
                }
            });
            return job;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao criar uma vaga!");
        }
    }
}
exports.CreateJobService = CreateJobService;
class UpdateJobService {
    async execute({ id_job, id_user, title, description, requirements, salary_range, location }) {
        if (!id_job || !id_user || !title || !description || !requirements || !salary_range || !location) {
            throw new Error("Preencha todos os campos!");
        }
        try {
            const job = await prisma_1.default.jobs.update({
                where: {
                    id_job: id_job
                },
                data: {
                    id_user: id_user,
                    title: title,
                    description: description,
                    requirements: requirements,
                    salary_range: salary_range,
                    location: location
                }
            });
            return job;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao atualizar a vaga!");
        }
    }
}
exports.UpdateJobService = UpdateJobService;
class DeleteJobService {
    async execute(id_job) {
        if (!id_job) {
            throw new Error("ID da vaga é obrigatório");
        }
        try {
            const job = await prisma_1.default.jobs.delete({
                where: {
                    id_job
                }
            });
            return job;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao deletar vaga!");
        }
    }
}
exports.DeleteJobService = DeleteJobService;
class GetMyJobService {
    async execute(id_user) {
        try {
            const job = await prisma_1.default.jobs.findMany({
                where: {
                    id_user
                }
            });
            return job;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar vagas");
        }
    }
}
exports.GetMyJobService = GetMyJobService;
class GetJobByIdService {
    async execute(id_job) {
        if (!id_job) {
            throw new Error("ID Inválido");
        }
        try {
            const job = await prisma_1.default.jobs.findFirst({
                where: {
                    id_job: Number(id_job)
                }
            });
            return job;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar a vaga!");
        }
    }
}
exports.GetJobByIdService = GetJobByIdService;
class ListJobService {
    async execute() {
        try {
            const job = await prisma_1.default.jobs.findMany();
            if (job.length === 0) {
                throw new Error("Nenhum curriculo disponivel!");
            }
            return job;
        }
        catch (error) {
            console.log(error);
            throw new Error("Erro ao listar as vagas!");
        }
    }
}
exports.ListJobService = ListJobService;
//# sourceMappingURL=job.js.map