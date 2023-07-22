import { Injectable, NotFoundException } from '@nestjs/common';
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
  async createCategory(name: string): Promise<Category> {
    //Koma katigoleyo ilipo?
    const category = await this.categoryRepository.findOneBy({name});
    if (category) {
      //Ngati palibe, onetsani uthenga wosonyeza kuti palibe
      throw new Error(`Category with name ${name} aleady exists`);
    }
    //Koma ngati lilipo, ponyani Category mu nkhokwe yosungiramo
    const newCategory = new Category();
    //name of the category
    newCategory.name = name;

    //Basitu ikani katogore mu nkhokwe
    return this.categoryRepository.save(newCategory);
  }

  //Fetching all the categories from the database
  findAll() {
    return this.categoryRepository.find();
  }

  //Fetching one category by id number from the database
  async findOne(id: number) {
  //Get a category from the database
  const category = await this.categoryRepository.findOneBy({id});
  if (!category) {
    //If the category is not available, then throw an error
    throw new NotFoundException(`category with ID ${id} not found.`);
  }
  //Otherwise return the category
  return category;
}

  //Deleting a category from the database by id
  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
