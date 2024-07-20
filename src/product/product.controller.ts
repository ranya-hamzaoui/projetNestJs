import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductSchema, ProductType, ProductUpdateType, updateProductSchema } from './dto/product.dto';
import { ZodValidatorPipe } from 'src/pipes/zod-validator/zod-validator.pipe';
import { ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/Product';



@ApiTags('Products')
@ApiExtraModels(ProductEntity)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Creation new Product' })
  @ApiResponse({ status: 200, description: 'Product created with success', type: ProductEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({  description: 'create new Product',type: ProductEntity })
  @UsePipes(new ZodValidatorPipe(createProductSchema))
  create(@Body() createProductDto: Required<ProductType>) {
    return this.productService.create(createProductDto);
  }
 
  @Get()
  @ApiOperation({ summary: 'Get List Products' })
  @ApiResponse({ status: 200, description: 'Get all Products', type: ProductEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Product by Id' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the Product' })
  @ApiResponse({ status: 200, description: 'Get Product By ID', type:ProductEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Product by Id' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the Product' })
  @ApiResponse({ status: 200, description: 'Product Update with success', type:ProductEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
   @Param('id',ParseIntPipe) id: string,
   @Body(new ZodValidatorPipe(updateProductSchema)) updateProductDto: Required<ProductUpdateType>) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete Product by Id' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the Product' })
  @ApiResponse({ status: 200, description: 'Product delete with success', type:ProductEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.productService.remove(+id);
  }
}
