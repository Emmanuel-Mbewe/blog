import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

//Updating the category name through Data Transfer Object
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    name: string;
}
