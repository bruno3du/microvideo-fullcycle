import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  validateSync,
} from 'class-validator';
import { Category } from './category.entity';

class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsString()
  @IsOptional()
  declare description: string;

  @IsBoolean()
  @IsNotEmpty()
  declare is_active: boolean;

  constructor(data: Category) {
    Object.assign(this, data);
  }
}

export class CategoryValidator {
  validate(entity: Category) {
    const validator = new CategoryRules(entity);
    return validateSync(validator);
  }
}
