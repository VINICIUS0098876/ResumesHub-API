import prismaClient from "../prisma";
import bcrypt from "bcrypt";


interface resume {
    id_resume?: number;
    id_user: number;
    phone: string;
    skills: string;
    experience_years: number;
    desired_position: string;
}

export class CreateResumeService{
    async execute({id_user, phone, skills, experience_years, desired_position}: resume){

        if(!id_user  || !phone || !skills || !experience_years || !desired_position){
            throw new Error("Preencha todos os campos");
        }

        try {
            const resume = await prismaClient.resumes.create({
                data:{
                    id_user,
                    phone,
                    skills,
                    experience_years,
                    desired_position
                }
            })


            return resume;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao criar currículo");
        }
    }
}

export class UpdateResumeService{
    async execute({id_resume, id_user, phone, skills, experience_years, desired_position}: resume){

        if(!id_resume || !id_user || !phone || !skills || !experience_years || !desired_position){
            throw new Error("Preencha todos os campos");
        }

        try {
            const resume = await prismaClient.resumes.update({
                where:{
                    id_resume: Number(id_resume)
                },
                data:{
                    id_user,
                    phone,
                    skills,
                    experience_years,
                    desired_position
                }
            })

            return resume;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao atualizar currículo");
        }
    }
}

export class DeleteResumeService{
    async execute(id_resume: number){

        if(!id_resume){
            throw new Error("ID do currículo é obrigatório");
        }

        try {
            const resume = await prismaClient.resumes.delete({
                where:{
                    id_resume: Number(id_resume)
                }
            })

            return resume;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao deletar currículo");
        }
}
}

// curriculo do usuario logado
export class GetMyResumesService{
    async execute(id_user: number){
        
        try {
            const resumes = await prismaClient.resumes.findMany({
                where:{
                    id_user: id_user
                }
            })

            if(resumes.length === 0){
                throw new Error("Nenhum currículo encontrado");
            }

            return resumes;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar currículos");
        }
    }
}

// Empresa ve o curriculo especifico
export class GetResumeByIdService{
    async execute(id_resume: number){
        if(!id_resume){
            throw new Error("ID Inválido");
        }

        try {
            const resume = await prismaClient.resumes.findFirst({
                where:{
                    id_resume: Number(id_resume)
                }
            })

            if(!resume){
                throw new Error("Currículo não encontrado");
            }

            return resume;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar currículo");
        }
    }
}

// empresa ve os curriculos
export class ListResumesService{
    async execute(){
        try {
            const resumes = await prismaClient.resumes.findMany()

            if(resumes.length === 0){
                throw new Error("Nenhum curriculo disponivel!")
            }

            return resumes

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao listar os curriculos!")
        }
    }
}

export class GetResumeByIdUserService{
    async execute(id_user: number){
        if(!id_user){
            throw new Error("ID do usuário é obrigatório");
        }

        try {
            const resumes = await prismaClient.resumes.findMany({
                where:{
                    id_user: Number(id_user)
                }
            })

            if(resumes.length === 0){
                throw new Error("Nenhum currículo encontrado");
            }

            return resumes;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar currículos");
        }
}
}

