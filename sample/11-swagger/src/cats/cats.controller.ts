import { Body, Controller, Get, Param, Post, Patch, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@ApiBearerAuth()
@ApiTags('cats')
@UsePipes(ValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

    @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of cats',
    type: Cat,
    isArray: true
  })
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Cat {
    const cat = this.catsService.findOne(+id);
    if (!cat) {
       throw new NotFoundException(`Cat with id = ${id} is not found!`)
    }
    return cat;
  }

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiForbiddenResponse()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cat' })
  @ApiBody({ schema: {
      type: 'object',
      title: 'UpdateCatDto',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        breed: { type: 'string' }
      },
      example: { age: 10 }
  }})
  @ApiParam({ 
      name: 'id',
      schema: {
        type: 'string',
        example: '1'
    }
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') catId: string, 
    @Body() updateCatDto: UpdateCatDto
  ): Promise<Cat> {
    const updatedCat = this.catsService.update(+catId, updateCatDto);
    if (!updatedCat) {
      throw new NotFoundException(`Cat with id = ${catId} is not found!`)
    }
    return updatedCat;
  }
}
