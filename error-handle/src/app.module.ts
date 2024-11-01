import { Module } from '@nestjs/common';
import { UploadController } from './multer/multer.controller';
import { AppService } from './multer/app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/pdfs'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [UploadController],
  providers: [AppService],
})
export class AppModule {}
