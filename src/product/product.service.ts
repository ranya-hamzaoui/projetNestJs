import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductType, ProductUpdateType } from './dto/product.dto';
import { PrismaService } from './../prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private db:PrismaService){}
  async create(createProductDto: Required<ProductType>) : Promise<Product>{
    const product = await this.db.product.create({ data : {
      categoryId : 1 ,
      ... createProductDto}});
    return product
  }
  
  findAll() : Promise<Product[]>{
    return this.db.product.findMany({});
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.db.product.findFirst({
      where: {
        id: id,
      },
      include: {
        categorie: {
          select: {
            title: true,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('not found product');
    }
    return product;
  }

  async update(id: number, updateproductDto: Required<ProductUpdateType>): Promise<Product> {
    await this.findOne(id);
    const product = await this.db.product.update({
      where: {
        id,
      },
      data: updateproductDto,
    });
    return product;
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.db.product.delete({
      where: {
        id
      },
    });
    return `Successfully deleted`;
  }
}
