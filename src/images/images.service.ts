// images.service.ts
import { Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Injectable()
export class FileUploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './upload', // Define your destination folder
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const originalExt = path.extname(file.originalname);
          callback(null, `${randomName}${originalExt}`);
        },
      }),
      limits: {
        fileSize: 1000000,
      },
      // fileFilter: (req, file, callback) => {
      //   const fileType = /jpeg|png|jpg/;
      //   const extname = fileType.test(path.extname(file.originalname));
      //   // if (extname) {
      //   //   callback(null, true);
      //   // } else {
      //   //   return callback(new Error('Invalid mime type'), false);
      //   // }
      // },
    };
  }
}
