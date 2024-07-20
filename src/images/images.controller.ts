  import {Controller,Get,Logger,Param,Post,Res,UploadedFile,UseInterceptors} from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { createReadStream } from 'fs';
  import { join } from 'path';
  
  @Controller('images')
  export class ImagesController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File) {
      return file;
    }
  
    @Get(':id')
    getFile(@Param('id') id: string, @Res() res) {
      const file = createReadStream(join(process.cwd(), `upload/${id}`));
      res.setHeader('Content-Type', `image/${id.split('.')[1]}`);
      file.pipe(res);
    }
  }