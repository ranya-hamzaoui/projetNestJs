import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderType } from './dto/order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {

  constructor(private db:PrismaService){}

  async create(createCategorieDto: Required<OrderType> ) : Promise<Order>{
    return await this.db.order.create({ data : createCategorieDto});
  }

  findAll() : Promise<Order[]>{
    return this.db.order.findMany({});
  }
  async findOne(id: number): Promise<Order> {
    const order = await this.db.order.findFirst({
      where: {
        id: id,
      },
    });
    if (!order) {
      throw new NotFoundException('not found Categorie');
    }
    return order;
  }

  async update(id: number, updateCategorieDto: Required<any>): Promise<Order> {
    await this.findOne(id);
    const Categorie = await this.db.order.update({
      where: {
        id,
      },
      data: updateCategorieDto,
    });
    return Categorie;
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.db.order.delete({
      where: {
        id
      },
    });
    return `Successfully deleted`;
  }
}
