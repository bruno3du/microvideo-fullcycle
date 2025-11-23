import { CategoryId } from '@core/category/domain/category.aggregate';
import { InvalidUuidError } from './uuid.vo';

describe('Uuid Unit Tests', () => {
  const validadeUuid = jest.spyOn(CategoryId.prototype as any, 'validate');

  it('should be able to create a valid uuid', () => {
    const uuid = new CategoryId();
    expect(uuid.id).toBeDefined();
  });

  it('should throw an error when creating an invalid uuid', () => {
    expect(() => new CategoryId('invalid-uuid')).toThrow(InvalidUuidError);
    expect(validadeUuid).toHaveBeenCalledTimes(1);
  });

  it('should accept a valid uuid', () => {
    const uuid = new CategoryId('00000000-0000-0000-0000-000000000000');
    expect(uuid.id).toBe('00000000-0000-0000-0000-000000000000');
  });

  it('should be able to compare two equal uuid', () => {
    const uuid1 = new CategoryId('00000000-0000-0000-0000-000000000000');
    const uuid2 = new CategoryId('00000000-0000-0000-0000-000000000000');
    expect(uuid1.equals(uuid2)).toBe(true);
  });

  it('should be able to reject two different uuid', () => {
    const uuid1 = new CategoryId();
    const uuid2 = new CategoryId();
    expect(uuid1.equals(uuid2)).toBe(false);
  });
});
