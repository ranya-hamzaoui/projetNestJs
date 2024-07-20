import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { ZodValidatorPipe } from 'src/pipes/zod-validator/zod-validator.pipe';
import { CategorieService } from './categorie.service';
import { CategorieType, CategorieUpdateType, createCategorieSchema } from './dto/categorie.dto';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  @UsePipes(new ZodValidatorPipe(createCategorieSchema))
  create(@Body() createCategorieDto: Required<CategorieType>) {
    return this.categorieService.create(createCategorieDto);
  }

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorieDto: Required<CategorieUpdateType>) {
    return this.categorieService.update(+id, updateCategorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieService.remove(+id);
  }
}
