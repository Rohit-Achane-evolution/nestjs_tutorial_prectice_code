import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileProcessor } from './file.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'file-upload', // This queue will handle file uploads
        }),
    ],
    controllers: [FileUploadController],
    providers: [FileUploadService, FileProcessor],
})
export class FileUploadModule { }
