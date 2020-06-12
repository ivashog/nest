import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private catsCounter: number = 1;
  private cats: Cat[] = [{
      id: this.catsCounter,
      name: 'Test',
      age: 1,
      breed: 'grey'
  }];


  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats.find(cat => cat.id === id);
  }

  create(cat: CreateCatDto): Cat {
    const newCat = { ...cat, id: ++this.catsCounter }
    this.cats.push(newCat);
    return newCat;
  }

  update(catId: number, updateCat: UpdateCatDto): Cat {
    const existCatIdx = this.cats.findIndex(cat => cat.id)
    if (existCatIdx === -1) return;
    this.cats[existCatIdx] = { ...this.cats[existCatIdx], ...updateCat }

    return this.cats[existCatIdx];
  }
}
