import { InvalidUuidError, Uuid } from './uuid-vo';

describe('Uuid Unit Tests', () => {
  const validadeUuid = jest.spyOn(Uuid.prototype as any, 'validate');

  it('should be able to create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
  });

  it('should throw an error when creating an invalid uuid', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(InvalidUuidError);
    expect(validadeUuid).toHaveBeenCalledTimes(1);
  });

  it('should accept a valid uuid', () => {
    const uuid = new Uuid('00000000-0000-0000-0000-000000000000');
    expect(uuid.id).toBe('00000000-0000-0000-0000-000000000000');
  });
});
