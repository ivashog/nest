import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({ description: 'Cat ID' })
  id: number = 1;

  @ApiProperty({ example: 'Kitty', description: 'The name of the Cat' })
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}
