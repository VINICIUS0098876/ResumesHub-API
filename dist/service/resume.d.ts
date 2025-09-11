interface resume {
    id_resume?: number;
    id_user: number;
    phone: string;
    skills: string;
    experience_years: number;
    desired_position: string;
}
export declare class CreateResumeService {
    execute({ id_user, phone, skills, experience_years, desired_position }: resume): Promise<{
        created_at: Date | null;
        id_user: number;
        phone: string | null;
        skills: string | null;
        experience_years: number | null;
        desired_position: string | null;
        id_resume: number;
    }>;
}
export declare class UpdateResumeService {
    execute({ id_resume, id_user, phone, skills, experience_years, desired_position }: resume): Promise<{
        created_at: Date | null;
        id_user: number;
        phone: string | null;
        skills: string | null;
        experience_years: number | null;
        desired_position: string | null;
        id_resume: number;
    }>;
}
export declare class DeleteResumeService {
    execute(id_resume: number): Promise<{
        created_at: Date | null;
        id_user: number;
        phone: string | null;
        skills: string | null;
        experience_years: number | null;
        desired_position: string | null;
        id_resume: number;
    }>;
}
export declare class GetMyResumesService {
    execute(id_user: number): Promise<{
        created_at: Date | null;
        id_user: number;
        phone: string | null;
        skills: string | null;
        experience_years: number | null;
        desired_position: string | null;
        id_resume: number;
    }[]>;
}
export declare class GetResumeByIdService {
    execute(id_resume: number): Promise<{
        created_at: Date | null;
        id_user: number;
        phone: string | null;
        skills: string | null;
        experience_years: number | null;
        desired_position: string | null;
        id_resume: number;
    }>;
}
export declare class ListResumesService {
    execute(): Promise<{
        created_at: Date | null;
        id_user: number;
        phone: string | null;
        skills: string | null;
        experience_years: number | null;
        desired_position: string | null;
        id_resume: number;
    }[]>;
}
export declare class GetResumeByIdUserService {
    execute(id_user: number): Promise<{
        created_at: Date | null;
        id_user: number;
        phone: string | null;
        skills: string | null;
        experience_years: number | null;
        desired_position: string | null;
        id_resume: number;
    }[]>;
}
export {};
//# sourceMappingURL=resume.d.ts.map