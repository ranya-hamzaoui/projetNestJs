import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductSchema, ProductType, ProductUpdateType, updateProductSchema } from './dto/product.dto';
import { ZodValidatorPipe } from 'src/pipes/zod-validator/zod-validator.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidatorPipe(createProductSchema))
  create(@Body() createProductDto: Required<ProductType>) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(
   @Param('id',ParseIntPipe) id: string,
   @Body(new ZodValidatorPipe(updateProductSchema)) updateProductDto: Required<ProductUpdateType>) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.productService.remove(+id);
  }
}
