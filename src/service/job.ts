import prismaClient from "../prisma";

interface job{
    id_job?: number,
    id_user?: number,
    title: string,
    description: string,
    requirements: string,
    salary_range: string,
    location: string
}

export class CreateJobService{
    async execute({id_user, title, description, requirements, salary_range, location}: job){
        if(!id_user || !title){
            throw new Error("Preencha os campos obrigatorios!");
        }

        try {
            const job = await prismaClient.jobs.create({
                data: {
                    id_user,
                    title,
                    description,
                    requirements,
                    salary_range,
                    location
                }
            })

            return job

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao criar uma vaga!")
        }
    }
}

export class UpdateJobService{
    async execute({id_job, id_user, title, description, requirements, salary_range, location}: job){
        if(!id_job || !id_user || !title || !description || !requirements || !salary_range || !location){
             throw new Error("Preencha todos os campos!");
        }

        try {
            const job = await prismaClient.jobs.update({
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
            })

            return job

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar a vaga!")
        }
    }
}

export class DeleteJobService{
    async execute(id_job: number){
        if(!id_job){
            throw new Error("ID da vaga é obrigatório");
        }

        try {
            const job = await prismaClient.jobs.delete({
                where: {
                    id_job
                }
            })

            return job

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao deletar vaga!")
        }
    }
}

export class GetMyJobService{
    async execute(id_user: number){
        try {
            const job = await prismaClient.jobs.findMany({
                where:{
                    id_user
                }
            })

            return job

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao buscar vagas")
        }
    }
}

export class GetJobByIdService{
    async execute(id_job: number){
        if(!id_job){
            throw new Error("ID Inválido");
        }

        try {
            const job = await prismaClient.jobs.findFirst({
                where:{
                    id_job: Number(id_job)
                }
            })

            return job

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao buscar a vaga!")
        }
    }
}

export class ListJobService{
    async execute(){
        try {
            const job = await prismaClient.jobs.findMany()

            if(job.length === 0){
                throw new Error("Nenhum curriculo disponivel!")
            }

            return job

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao listar as vagas!")

        }
    }
}