import { Uuid } from '../../../shared/domain/value-objects/uuid-vo';
import { Category } from '../category.entity';

describe('CategoryEntity Unit Tests', () => {
  it('should be able to create a category', () => {
    const input = {
      name: 'Category 1',
    };

    let category = new Category(input);

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Category 1');
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({
      name: 'Movie',
      description: 'Movie description',
      is_active: false,
      created_at,
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBe(created_at);
  });

  it('should be able to change the name of a category', () => {
    const category = new Category({
      name: 'Movie',
    });

    category.changeName('Movie 2');
    expect(category.name).toBe('Movie 2');
  });

  it('should be able to create category from command', () => {
    const input = {
      name: 'Movie',
    };
    const category = Category.create(input);
    expect(category.name).toBe('Movie');
  });

  it('should be able to change the description of a category', () => {
    const category = new Category({
      name: 'Movie',
    });

    category.changeDescription('Movie description');
    expect(category.description).toBe('Movie description');
  });

  it('should be able to activate a category', () => {
    const category = new Category({
      name: 'Movie',
      is_active: false,
    });

    category.activate();
    expect(category.is_active).toBe(true);
  });

  it('should be able to deactivate a category', () => {
    const category = new Category({
      name: 'Movie',
      is_active: true,
    });

    category.deactivate();
    expect(category.is_active).toBe(false);
  });

  describe('category_id field', () => {
    const arrange = [
      {
        category_id: null,
      },
      {
        category_id: undefined,
      },
      {
        category_id: new Uuid(),
      },
    ];

    test.each(arrange)('category_id: %j', (item) => {
      console.log(item);
      const category = new Category({
        name: 'Movie',
        category_id: item.category_id as any,
      });
      console.log(category.category_id);
      expect(category.category_id).toBeInstanceOf(Uuid);
    });
  });
});
