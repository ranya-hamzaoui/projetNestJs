import { Module } from '@nestjs/common';
import { FileUploadService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesController } from './images.controller';

@Module({
  imports : [
    MulterModule.registerAsync({
      useClass: FileUploadService,
    }),
  ],
  providers: [FileUploadService],
  controllers: [ImagesController]
})
export class ImagesModule {}
