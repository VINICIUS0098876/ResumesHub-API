"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListJobController = exports.GetJobByIdController = exports.GetMyJobController = exports.DeleteJobController = exports.UpdateJobController = exports.CreateJobController = void 0;
const job_1 = require("../service/job");
class CreateJobController {
    async handle(req, res) {
        const { title, description, requirements, salary_range, location } = req.body;
        const id_user = req.user?.id_user;
        if (!id_user || !title) {
            return res.status(400).json({ message: "Preencha todos os campos obrigatorios!" });
        }
        try {
            const createJobService = new job_1.CreateJobService();
            const job = await createJobService.execute({ id_user, title, description, requirements, salary_range, location });
            return res.status(201).json(job);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar currículo" });
        }
    }
}
exports.CreateJobController = CreateJobController;
class UpdateJobController {
    async handle(req, res) {
        const id_job = Number(req.params.id_job);
        const id_user = req.user?.id_user;
        const { title, description, requirements, salary_range, location } = req.body;
        if (!id_user || !title || !description || !requirements || !salary_range || !location) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        try {
            const updateJobService = new job_1.UpdateJobService();
            const job = await updateJobService.execute({ id_job, id_user, title, description, requirements, salary_range, location });
            return res.status(200).json(job);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar a vaga!" });
        }
    }
}
exports.UpdateJobController = UpdateJobController;
class DeleteJobController {
    async handle(req, res) {
        const id_job = Number(req.params.id_job);
        if (!id_job) {
            return res.status(400).json({ message: "O ID da vaga é obrigatório" });
        }
        try {
            const deleteJobService = new job_1.DeleteJobService();
            const job = await deleteJobService.execute(id_job);
            return res.status(200).json({ message: "Vaga deletada com sucesso!" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao deletar a vaga" });
        }
    }
}
exports.DeleteJobController = DeleteJobController;
class GetMyJobController {
    async handle(req, res) {
        const id_user = req.user?.id_user;
        if (!id_user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        try {
            const getMyJobService = new job_1.GetMyJobService();
            const job = await getMyJobService.execute(id_user);
            if (!job) {
                return res.status(404).json({ message: "Vaga não encontrada!" });
            }
            return res.status(200).json(job);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao obter a vaga" });
        }
    }
}
exports.GetMyJobController = GetMyJobController;
class GetJobByIdController {
    async handle(req, res) {
        const { id_job } = req.params;
        if (!id_job) {
            return res.status(400).json({ message: "ID da vaga é obrigatório" });
        }
        try {
            const getJobByIdService = new job_1.GetJobByIdService();
            const job = await getJobByIdService.execute(parseInt(id_job));
            if (!job) {
                return res.status(404).json({ message: "Vaga não encontrada" });
            }
            return res.status(200).json(job);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter a vaga!" });
        }
    }
}
exports.GetJobByIdController = GetJobByIdController;
class ListJobController {
    async handle(req, res) {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        try {
            const listJobService = new job_1.ListJobService();
            const job = await listJobService.execute();
            return res.status(200).json(job);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro Internal Server" });
        }
    }
}
exports.ListJobController = ListJobController;
//# sourceMappingURL=job_controller.js.map