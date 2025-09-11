import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare class CreateJobController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class UpdateJobController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class DeleteJobController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class GetMyJobController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class GetJobByIdController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class ListJobController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=job_controller.d.ts.map