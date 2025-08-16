import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import { Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { CategorySequelizeRepository } from '../../core/category/infra/db/sequelize/category-sequelize.repository';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './categories.providers';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: CategorySequelizeRepository,
      useFactory: (categoryModel: typeof CategoryModel) =>
        new CategorySequelizeRepository(categoryModel),
      inject: [getModelToken(CategoryModel)],
    },
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}
