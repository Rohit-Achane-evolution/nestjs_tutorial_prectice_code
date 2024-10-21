import { InjectQueue } from "@nestjs/bull";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Queue } from "bull";
import { delay } from "rxjs";

@Injectable()
export class FileUploadService {
    constructor(
        @InjectQueue('file-upload') private readonly fileQueue: Queue,
    ) { }

    async handleFileUpload(file: Express.Multer.File) {
        try {
            await this.fileQueue.add(
                'file-upload-job',
                {
                    filename: file.originalname,
                    path: file.path,
                },
                { delay: 3000, lifo: true },
            );

            return { message: 'File uploaded successfully and is being processed!' };
        } catch (error) {
            console.error('Error adding file to queue:', error.message);
            throw new InternalServerErrorException('Could not add file to the queue');
        }
    }
}
