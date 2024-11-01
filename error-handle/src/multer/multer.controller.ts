import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { AppService } from './app.service';

@Controller('upload')
export class UploadController {
  constructor(private appservice: AppService) {}
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          callback(null, `${uniqueSuffix}`);
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
      },
      fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          // Allow only jpg, jpeg, and png files
          callback(null, true);
        } else {
          callback(new Error('Only image files are allowed!'), false);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
    };
  }

  @Post('pdf')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/pdfs', // Set the upload folder
        filename: (req, file, callback) => {
          // Customize file name to avoid conflicts
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
      },
      fileFilter: (req, file, callback) => {
        // Allow only PDF files
        if (file.mimetype === 'application/pdf') {
          callback(null, true);
        } else {
          callback(new Error('Only PDF files are allowed!'), false);
        }
      },
    }),
  )
  uploadPdf(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      path: file.path,
      originalname: file.originalname,
    };
  }

  @Get()
  async getAllImageData() {
    return await this.appservice.getAllData();
  }
}
