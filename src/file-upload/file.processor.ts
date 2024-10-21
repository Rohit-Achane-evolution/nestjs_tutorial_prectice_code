import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';
import * as path from 'path';

@Processor('file-upload')
export class FileProcessor {
    @Process('file-upload-job')
    async handleFileUploadJob(job: Job) {
        try {
            const { filename, path: filePath } = job.data;

            console.log(`Processing file: ${filename}`);
            const destination = path.join(__dirname, '..', 'processed', filename);

            fs.rename(filePath, destination, (err) => {
                if (err) throw err;
                console.log(`File moved to: ${destination}`);
            });
        } catch (error) {
            console.error('Error processing file:', error.message);
        }
    }
}
