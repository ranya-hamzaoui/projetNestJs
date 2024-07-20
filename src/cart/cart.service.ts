import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartType ,CartUpdateType} from './dto/cart.dto';
import { Cart } from '@prisma/client';


@Injectable()
export class CartService {
  constructor(private db:PrismaService){}

  async create(createCartDto: Required<CartType>) : Promise<Cart>{
    const cart = await this.db.cart.create({ data : {... createCartDto}});
    return cart
  }
  
  findAll() : Promise<Cart[]>{
    return this.db.cart.findMany({});
  }

  async findOne(id: number): Promise<Cart> {
    const Cart = await this.db.cart.findFirst({
      where: {
        id: id,
      }
    });
    if (!Cart) {
      throw new NotFoundException('not found Cart');
    }
    return Cart;
  }

  async update(id: number, updateCartDto: Required<CartUpdateType>): Promise<Cart> {
    await this.findOne(id);
    const Cart = await this.db.cart.update({
      where: {
        id,
      },
      data: updateCartDto,
    });
    return Cart;
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.db.cart.delete({
      where: {
        id
      },
    });
    return `Successfully deleted`;
  }
}
