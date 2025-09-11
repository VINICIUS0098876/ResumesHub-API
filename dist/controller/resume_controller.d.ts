import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare class CreateResumeController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class UpdateResumeController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class DeleteResumeController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class GetMyResumeController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class GetResumeByIdController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class ListResumeController {
    handle(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=resume_controller.d.ts.map