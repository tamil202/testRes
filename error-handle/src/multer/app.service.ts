import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  // Define the path to the uploads directory
  private readonly uploadsPath = path.join(__dirname, '../../uploads');

  async getAllData(): Promise<string[]> {
    const files = await fs.promises.readdir(this.uploadsPath);

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file),
    );

    const data = imageFiles.map((file) => path.join('uploads', file));

    if (!data.length) {
      throw new NotFoundException('No Data Founds');
    }
    return data;
  }
}
