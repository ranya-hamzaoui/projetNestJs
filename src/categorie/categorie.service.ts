import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategorieType, CategorieUpdateType } from './dto/categorie.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategorieService {

  constructor(private db:PrismaService){}

  async create(createCategorieDto: Required<CategorieType> ) : Promise<Category>{
    return await this.db.category.create({ data : createCategorieDto});
  }

  findAll() : Promise<Category[]>{
    return this.db.product.findMany({});
  }
  async findOne(id: number): Promise<Category> {
    const Categorie = await this.db.category.findFirst({
      where: {
        id: id,
      },
    });
    if (!Categorie) {
      throw new NotFoundException('not found Categorie');
    }
    return Categorie;
  }

  async update(id: number, updateCategorieDto: Required<CategorieUpdateType>): Promise<Category> {
    await this.findOne(id);
    const Categorie = await this.db.category.update({
      where: {
        id,
      },
      data: updateCategorieDto,
    });
    return Categorie;
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.db.category.delete({
      where: {
        id
      },
    });
    return `Successfully deleted`;
  }
}
