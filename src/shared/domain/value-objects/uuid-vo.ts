import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ValueObject } from '../value-object';

export class Uuid extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || this.generateId();
    this.validate();
  }

  private generateId(): string {
    return uuidv4();
  }

  private validate() {
    if (!uuidValidate(this.id)) {
      throw new InvalidUuidError();
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID must be a valid UUID');
    this.name = 'InvalidUuidError';
  }
}
