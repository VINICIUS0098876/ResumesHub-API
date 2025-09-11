import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { CreateJobService, UpdateJobService, DeleteJobService, GetMyJobService,GetJobByIdService,ListJobService } from "../service/job";


export class CreateJobController{
    async handle(req:AuthRequest, res:Response){
        const { title, description, requirements, salary_range, location} = req.body

        const id_user = req.user?.id_user

        if(!id_user || !title){
            return res.status(400).json({ message: "Preencha todos os campos obrigatorios!" });
        }

        try {
            const createJobService = new CreateJobService()

            const job = await createJobService.execute({id_user, title, description, requirements, salary_range, location})

            return res.status(201).json(job);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar currículo" })
        }

    }
}

export class UpdateJobController{
    async handle(req: AuthRequest, res: Response){
        const id_job = Number(req.params.id_job)
        const id_user = req.user?.id_user
        const {title, description, requirements, salary_range, location} = req.body

        if(!id_user || !title || !description || !requirements || !salary_range || !location){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        try {
            const updateJobService = new UpdateJobService()

            const job = await updateJobService.execute({id_job, id_user, title, description, requirements, salary_range, location})

            return res.status(200).json(job);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar a vaga!" })
        }

    }
}

export class DeleteJobController{
    async handle(req:Request, res:Response){
        const id_job = Number(req.params.id_job)

        if(!id_job){
            return res.status(400).json({ message: "O ID da vaga é obrigatório" });
        }

        try {
            const deleteJobService = new DeleteJobService()

            const job = await deleteJobService.execute(id_job)

            return  res.status(200).json({ message: "Vaga deletada com sucesso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao deletar a vaga" });
        }
    }
}

export class GetMyJobController{
    async handle(req: AuthRequest, res:Response){
        const id_user = req.user?.id_user

        if(!id_user){
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        try {
            const getMyJobService = new GetMyJobService()

            const job = await getMyJobService.execute(id_user)

            if(!job){
                return res.status(404).json({ message: "Vaga não encontrada!" });
            }

            return res.status(200).json(job)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao obter a vaga" });
        }
    }
}

export class GetJobByIdController{
    async handle(req:Request, res: Response){
        const {id_job} = req.params

        if(!id_job){
            return res.status(400).json({ message: "ID da vaga é obrigatório" });
        }

        try {
            const getJobByIdService = new GetJobByIdService()

            const job = await getJobByIdService.execute(parseInt(id_job))

            if(!job){
                return res.status(404).json({ message: "Vaga não encontrada" });
            }

            return res.status(200).json(job);

            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter a vaga!" });
        }
    }
}


export class ListJobController{
    async handle(req: AuthRequest, res: Response){
        if(!req.user){
            return res.status(401).json({message: 'Usuário não autenticado'})
        }

        try {
            const listJobService = new ListJobService()

            const job = await listJobService.execute()

            return res.status(200).json(job)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro Internal Server"})
        }
    }
}