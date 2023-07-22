import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

//The controller class for the categories of the posts
@Controller('categories')
export class CategoryController {
  //Injexting the category provider object
  constructor(private readonly categoryService: CategoryService) {}

  //Posting the category
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
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

  //Updating the category
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  //Deleting the category from the database by id number
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
