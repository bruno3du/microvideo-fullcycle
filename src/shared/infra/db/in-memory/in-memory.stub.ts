import { Entity } from '../../../domain/entity';
import { Uuid } from '../../../domain/value-objects/uuid-vo';
import { InMemoryRepository } from './in-memory.repository';

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

export class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

export class StubInMemoryRepository extends InMemoryRepository<
  StubEntity,
  Uuid
> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}
