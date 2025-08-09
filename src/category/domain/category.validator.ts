import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields';
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

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(entity: Category) {
    return super.validate(new CategoryRules(entity));
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
