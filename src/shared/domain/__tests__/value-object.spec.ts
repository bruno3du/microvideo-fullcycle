import { ValueObject } from '../value-object';

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    readonly value: string,
    readonly value2: string,
  ) {
    super();
  }
}

describe('ValueObject Unit Tests', () => {
  it('should be able to compare two EQUAL value objects', () => {
    const vo1 = new StringValueObject('test');
    const vo2 = new StringValueObject('test');
    expect(vo1.equals(vo2)).toBe(true);
  });

  it('should be able to compare two DIFFERENT value objects', () => {
    const vo1 = new StringValueObject('test');
    const vo2 = new StringValueObject('test2');
    expect(vo1.equals(vo2)).toBe(false);
  });

  it('should be able to compare two EQUAL complex value objects', () => {
    const vo1 = new ComplexValueObject('test', 'test2');
    const vo2 = new ComplexValueObject('test', 'test2');
    expect(vo1.equals(vo2)).toBe(true);
  });

  it('should be able to compare two DIFFERENT complex value objects', () => {
    const vo1 = new ComplexValueObject('test', 'test2');
    const vo2 = new ComplexValueObject('test', 'test3');
    expect(vo1.equals(vo2)).toBe(false);
  });
});
