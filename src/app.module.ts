import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategorieModule } from './categorie/categorie.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ProductModule,
    UserModule,
    CategorieModule,
    OrderModule,
    CartModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
