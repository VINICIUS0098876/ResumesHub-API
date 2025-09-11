"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListResumeController = exports.GetResumeByIdController = exports.GetMyResumeController = exports.DeleteResumeController = exports.UpdateResumeController = exports.CreateResumeController = void 0;
const resume_1 = require("../service/resume");
// Controlador para criar um currículo
class CreateResumeController {
    async handle(req, res) {
        // Extrair os dados do corpo da requisição
        const { phone, skills, experience_years, desired_position } = req.body;
        // Pegar o id do usuário logado
        const id_user = req.user?.id_user;
        // Verificar se todos os campos necessários foram fornecidos
        if (!id_user || !phone || !skills || !experience_years || !desired_position) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        try {
            // Chamar o serviço de criação de currículo
            const createResumeService = new resume_1.CreateResumeService();
            // Executar o serviço de criação de currículo
            const resume = await createResumeService.execute({ id_user, phone, skills, experience_years, desired_position });
            return res.status(201).json(resume);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar currículo" });
        }
    }
}
exports.CreateResumeController = CreateResumeController;
// Controlador para atualizar um currículo
class UpdateResumeController {
    async handle(req, res) {
        // Extrair o id do currículo dos parâmetros da requisição
        const id_resume = Number(req.params.id_resume);
        // Extrair os dados do corpo da requisição
        const { phone, skills, experience_years, desired_position } = req.body;
        // Pegar o id do usuário logado
        const id_user = req.user?.id_user;
        // Verificar se todos os campos necessários foram fornecidos
        if (!id_resume || !id_user || !phone || !skills || !experience_years || !desired_position) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        try {
            // Chamar o serviço de atualização de currículo
            const updateResumeService = new resume_1.UpdateResumeService();
            // Executar o serviço de atualização de currículo
            const resume = await updateResumeService.execute({ id_resume, id_user, phone, skills, experience_years, desired_position });
            return res.status(200).json(resume);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar currículo" });
        }
    }
}
exports.UpdateResumeController = UpdateResumeController;
// Controlador deleta o curriculo
class DeleteResumeController {
    async handle(req, res) {
        // Extrair o id do currículo dos parâmetros da requisição
        const id_resume = Number(req.params.id_resume);
        // Verificar se o id do currículo foi fornecido
        if (!id_resume) {
            return res.status(400).json({ message: "O id do currículo é obrigatório" });
        }
        try {
            // Chamar o serviço de deleção de currículo
            const deleteResumeService = new resume_1.DeleteResumeService();
            // Executar o serviço de deleção de currículo
            const resume = await deleteResumeService.execute(id_resume);
            return res.status(200).json({ message: "Currículo deletado com sucesso" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao deletar currículo" });
        }
    }
}
exports.DeleteResumeController = DeleteResumeController;
// Controlador lista o curriculo do usuario logado
class GetMyResumeController {
    async handle(req, res) {
        const id_user = req.user?.id_user;
        if (!id_user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        try {
            // Chamar o serviço de obtenção de currículo por ID
            const getResumeService = new resume_1.GetMyResumesService();
            // Executar o serviço de obtenção de currículo por ID
            const resume = await getResumeService.execute(id_user);
            if (!resume) {
                return res.status(404).json({ message: "Currículo não encontrado" });
            }
            return res.status(200).json(resume);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao obter currículo" });
        }
    }
}
exports.GetMyResumeController = GetMyResumeController;
// Empresa ve curriculo especifico
class GetResumeByIdController {
    async handle(req, res) {
        // Extrair o id do currículo dos parâmetros da requisição
        const { id_resume } = req.params;
        // Verificar se o id do currículo foi fornecido
        if (!id_resume) {
            return res.status(400).json({ message: "ID do currículo é obrigatório" });
        }
        try {
            // Chamar o serviço de obtenção de currículo por ID
            const getResumeByIdService = new resume_1.GetResumeByIdService();
            // Executar o serviço de obtenção de currículo por ID
            const resume = await getResumeByIdService.execute(parseInt(id_resume));
            if (!resume) {
                return res.status(404).json({ message: "Currículo não encontrado" });
            }
            return res.status(200).json(resume);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter currículo" });
        }
    }
}
exports.GetResumeByIdController = GetResumeByIdController;
// Empresa vai ver os curriculos listados
class ListResumeController {
    async handle(req, res) {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        try {
            const listResumeService = new resume_1.ListResumesService();
            const resumes = await listResumeService.execute();
            return res.status(200).json(resumes);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro Internal Server" });
        }
    }
}
exports.ListResumeController = ListResumeController;
//# sourceMappingURL=resume_controller.js.map