interface job {
    id_job?: number;
    id_user?: number;
    title: string;
    description: string;
    requirements: string;
    salary_range: string;
    location: string;
}
export declare class CreateJobService {
    execute({ id_user, title, description, requirements, salary_range, location }: job): Promise<{
        created_at: Date | null;
        id_user: number;
        title: string;
        description: string | null;
        requirements: string | null;
        salary_range: string | null;
        location: string | null;
        id_job: number;
    }>;
}
export declare class UpdateJobService {
    execute({ id_job, id_user, title, description, requirements, salary_range, location }: job): Promise<{
        created_at: Date | null;
        id_user: number;
        title: string;
        description: string | null;
        requirements: string | null;
        salary_range: string | null;
        location: string | null;
        id_job: number;
    }>;
}
export declare class DeleteJobService {
    execute(id_job: number): Promise<{
        created_at: Date | null;
        id_user: number;
        title: string;
        description: string | null;
        requirements: string | null;
        salary_range: string | null;
        location: string | null;
        id_job: number;
    }>;
}
export declare class GetMyJobService {
    execute(id_user: number): Promise<{
        created_at: Date | null;
        id_user: number;
        title: string;
        description: string | null;
        requirements: string | null;
        salary_range: string | null;
        location: string | null;
        id_job: number;
    }[]>;
}
export declare class GetJobByIdService {
    execute(id_job: number): Promise<{
        created_at: Date | null;
        id_user: number;
        title: string;
        description: string | null;
        requirements: string | null;
        salary_range: string | null;
        location: string | null;
        id_job: number;
    } | null>;
}
export declare class ListJobService {
    execute(): Promise<{
        created_at: Date | null;
        id_user: number;
        title: string;
        description: string | null;
        requirements: string | null;
        salary_range: string | null;
        location: string | null;
        id_job: number;
    }[]>;
}
export {};
//# sourceMappingURL=job.d.ts.map