import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

//The controller class for the categories of the posts
@Controller('categories')
export class CategoryController {
  //Injexting the category provider object
  constructor(private readonly categoryService: CategoryService) {}

  //Posting the category
  @Post()
  create(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  //Getting all categories from the database
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  //Getting a single category from the database by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  //Deleting the category from the database by id number
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
