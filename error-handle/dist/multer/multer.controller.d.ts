import { AppService } from './app.service';
export declare class UploadController {
    private appservice;
    constructor(appservice: AppService);
    uploadFile(file: Express.Multer.File): Promise<{
        filename: any;
        originalname: any;
        path: any;
    }>;
    uploadPdf(file: Express.Multer.File): {
        filename: any;
        path: any;
        originalname: any;
    };
    getAllImageData(): Promise<string[]>;
}
