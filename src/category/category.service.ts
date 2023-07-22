import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

//The provider class for the categories
@Injectable()
export class CategoryService {
  //Constructing the new category
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ){}

  //Creating the new category in the database
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  //Fetching all the categories from the database
  findAll() {
    return this.categoryRepository.find();
  }

  //Fetching one category by id number from the database
  findOne(id: number) {
    return this.categoryRepository.findOneBy({id});
  }

  //Updating the category
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.save(updateCategoryDto);
  }

  //Deleting a category from the database by id
  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
