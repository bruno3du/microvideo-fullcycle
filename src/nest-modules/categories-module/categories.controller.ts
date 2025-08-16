import { CategorySequelizeRepository } from '@core/category/infra/db/sequelize/category-sequelize.repository';
import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(getModelToken(CategoryModel))
    private categoryRepository: CategorySequelizeRepository,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return 'create';
  }

  @Get()
  findAll() {
    return 'findAll';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'findOne';
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return 'update';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'remove';
  }
}
