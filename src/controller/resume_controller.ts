import { Request, Response } from "express";
import { CreateResumeService, UpdateResumeService, DeleteResumeService, GetResumeByIdService, GetMyResumesService, ListResumesService } from "../service/resume";
import { AuthRequest } from "../middleware/auth";

// Controlador para criar um currículo
export class CreateResumeController{
    async handle(req: AuthRequest, res: Response){
        // Extrair os dados do corpo da requisição
        const { phone, skills, experience_years, desired_position } = req.body;

        // Pegar o id do usuário logado
        const id_user = req.user?.id_user;

        // Verificar se todos os campos necessários foram fornecidos
        if(!id_user || !phone || !skills || !experience_years || !desired_position){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        try {
            // Chamar o serviço de criação de currículo
            const createResumeService = new CreateResumeService()
            // Executar o serviço de criação de currículo
            const resume = await createResumeService.execute({ id_user, phone, skills, experience_years, desired_position });

            return res.status(201).json(resume);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar currículo" });
        }
    }
}

// Controlador para atualizar um currículo
export class UpdateResumeController{
    async handle(req: AuthRequest, res: Response){
        // Extrair o id do currículo dos parâmetros da requisição
        const id_resume = Number(req.params.id_resume)
        // Extrair os dados do corpo da requisição
        const { phone, skills, experience_years, desired_position } = req.body;

        // Pegar o id do usuário logado
        const id_user = req.user?.id_user;

        // Verificar se todos os campos necessários foram fornecidos
        if(!id_resume || !id_user || !phone || !skills || !experience_years || !desired_position){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        try {
            // Chamar o serviço de atualização de currículo
            const updateResumeService = new UpdateResumeService()
            // Executar o serviço de atualização de currículo
            const resume = await updateResumeService.execute({ id_resume, id_user, phone, skills, experience_years, desired_position });

            return res.status(200).json(resume);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar currículo" });
        }
    }
}

// Controlador deleta o curriculo
export class DeleteResumeController{
    async handle(req: Request, res: Response){
        // Extrair o id do currículo dos parâmetros da requisição
        const id_resume = Number(req.params.id_resume)
        // Verificar se o id do currículo foi fornecido
        if(!id_resume){
            return res.status(400).json({ message: "O id do currículo é obrigatório" });
        }

        try {
            // Chamar o serviço de deleção de currículo
            const deleteResumeService = new DeleteResumeService()
            // Executar o serviço de deleção de currículo
            const resume = await deleteResumeService.execute(id_resume);

            return  res.status(200).json({ message: "Currículo deletado com sucesso" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao deletar currículo" });
        }
    }
}

// Controlador lista o curriculo do usuario logado
export class GetMyResumeController{
    async handle(req: AuthRequest, res: Response){

        const id_user = req.user?.id_user

          if (!id_user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

        try {
            // Chamar o serviço de obtenção de currículo por ID
            const getResumeService = new GetMyResumesService()
            // Executar o serviço de obtenção de currículo por ID
            const resume = await getResumeService.execute(id_user);

            if(!resume){
                return res.status(404).json({ message: "Currículo não encontrado" });
            }

            return res.status(200).json(resume);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao obter currículo" });
        }
    }
}


// Empresa ve curriculo especifico
export class GetResumeByIdController{
    async handle(req: Request, res: Response){
        // Extrair o id do currículo dos parâmetros da requisição
        const {id_resume} = req.params;

        // Verificar se o id do currículo foi fornecido
        if(!id_resume){
            return res.status(400).json({ message: "ID do currículo é obrigatório" });
        }

        try {
            // Chamar o serviço de obtenção de currículo por ID
            const getResumeByIdService = new GetResumeByIdService()
            // Executar o serviço de obtenção de currículo por ID
            const resume = await getResumeByIdService.execute(parseInt(id_resume));

            if (!resume) {
                return res.status(404).json({ message: "Currículo não encontrado" });
            }

            return res.status(200).json(resume);

        } catch (error) {
            console.error(error);
      return res.status(500).json({ message: "Erro ao obter currículo" });
        }
    }
}

// Empresa vai ver os curriculos listados
export class ListResumeController{
    async handle(req: Request, res: Response){
        try {
            const listResumeService = new ListResumesService()

            const resumes = await listResumeService.execute()

            return res.status(200).json(resumes)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro Internal Server"})
        }
    }
}
