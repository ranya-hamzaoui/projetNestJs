import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity {
  /**
   * The name of the Cat
   * @example Kitty
   */
  name: string;

  @ApiProperty({ example: 1, description: 'The name of the Cat' })
  title: number;

  @ApiProperty({example: 'Maine Coon', description: 'The description of the Product',
  })
  description: string;
}